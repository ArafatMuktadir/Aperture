import { auth, firestore } from "@/src/firebase/clientApp";
import { Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider, Input } from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps={
    open:boolean
    handleClose:() => void
}

const CreateCommunityModal:React.FC<CreateCommunityModalProps>= ({
    open,
    handleClose
}) => {
    const [user]=useAuthState(auth)
    const [communityName,setCommunityName] = useState("")
    const [charsRemaining,setCharsRemaining] = useState(25)
    const [error,setError]=useState("")
    const[loading,setLoading]=useState(false)
    
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        if (event.target.value.length >25)
        return

        setCommunityName(event.target.value)
        setCharsRemaining(25-event.target.value.length)
    }

    const handleCreateCommunity=async()=>{

        setLoading(true)

        try{
            const communityDocRef=doc(firestore,"communities",communityName)

            await runTransaction(firestore, async(transaction)=>{

                const communityDoc=await transaction.get(communityDocRef)
            
                if(communityDoc.exists()){

                    throw new Error('Sorry,✤${communityName} is taken already! Try a different one.')
                
            }
        
            
            transaction.set(communityDocRef, {
                creatorId: user?.uid,
                createdAt: serverTimestamp(),
                numberOfMembers:1,
                
            })

            transaction.set(
                doc(firestore,'users/${user?.uid}/communitySnippets', communityName),
                {
                    communityId: communityName,
                    isModerator: true,
                }
            )
        })

        } catch(error:any){

            console.log('handleCreateCommunity error',error)
            setError(error.message)

        }


        setLoading(false)
    }
    
    return (
        <>
    
          <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              
              <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>Create a community
              
              </ModalHeader>
              
              <Box pl={3} pr={3}>
                <Divider/>
                
                <ModalCloseButton />
                
                <ModalBody display="flex" flexDirection="column" padding="10px 0px">Here is the modal body
                
                <Text fontWeight={600} fontSize={15}> Name</Text>
                
                <Text fontSize={12} color="black">
                    Community names including capitalization cannot be changed
                </Text>

                <Text position="relative" top="28px" left="1px" width="20px" color="green.400">✤</Text>
                
                <Input position="relative" value={communityName}  left="0px" pt="1px" onChange={handleChange}/>
                <Text>
                    {charsRemaining} Characters remaining
                </Text>
                </ModalBody>
              </Box>
              <ModalFooter bg="gray.50" borderRadius="0px 0px 10px 10px">
                <Button 
                    variant="ghost"
                    onClick={handleClose}
                    mr={3}
                    height="30px"
                    colorScheme='black'
                    >
                  Cancel
                </Button>
                <Button height="30px" colorScheme='green' onClick={handleCreateCommunity} isLoading={loading}>Create Community</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
)}
export default CreateCommunityModal