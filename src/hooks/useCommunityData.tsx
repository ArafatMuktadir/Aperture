import { getDocs, collection } from "firebase/firestore"
import React, { useState } from "react"
import { useRecoilState } from "recoil"
import { Community, CommunitySnippet, communityState } from "../atoms/communitiesAtom"
import { auth, firestore } from "../firebase/clientApp"
import {useAuthState} from "react-firebase-hooks/auth"
import { useFocusEffect } from "@chakra-ui/react"

const useCommunityData=()=> {
    const [user]=useAuthState(auth)
    const [communityStateValue, setCommunityStateValue]=
        useRecoilState(communityState)
    const [loading,setLoading]=useState(false)
    const [error, setError]=useState("")

    const onJoinOrLeaveCommunity=(communityData: Community, isJoined: boolean)=>{
        if(isJoined){
            leaveCommunity(communityData.id)
            return
        }
        joinCommunity(communityData)
    }

    const getMySnippets=async()=>{
        setLoading(true)

        try{
            const snippetDocs=await getDocs(
                collection(firestore,"users/${user?.uid}/communitySnippets")
            )
            const snippets =snippetDocs.docs.map((doc)=> ({...doc.data()}))
            setCommunityStateValue(prev=>({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
            }))
            

        } catch(error){
            console.log("getMySnippets error",error)
            setError(error.message)
        }
        setLoading(false)
    }

    const joinCommunity=(communityData:Community)=>{}
    const leaveCommunity=(communityId:string)=>{}

    useFocusEffect(() => {
        if(!user) return
        getMySnippets()
    }, [user])


    
    return{
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    }

}
export default useCommunityData

