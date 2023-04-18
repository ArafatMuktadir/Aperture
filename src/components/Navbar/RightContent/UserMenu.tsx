import {ChevronDownIcon} from "@chakra-ui/icons"
import {Menu,MenuButton,MenuList,MenuItem, Button, Box, Flex, Icon, MenuDivider} from "@chakra-ui/react"
import { signOut, User } from "firebase/auth"
import React from "react"
import { GiAbstract111 } from "react-icons/gi"
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLogin } from "react-icons/md"
import { CgProfile } from "react-icons/cg"
import { auth } from "@/src/firebase/clientApp"
import { authModalState } from "@/src/atoms/authModalAtom"
import { useResetRecoilState, useSetRecoilState } from "recoil"
import { IoSparkles } from "react-icons/io5"
import {Text} from "@chakra-ui/react"
import { communityState } from "@/src/atoms/communitiesAtom"

type UserMenuProps={
    user?:User | null
}
 const UserMenu:React.FC<UserMenuProps>=({user})=>{
    const resetCommunityState=useResetRecoilState(communityState)
    const setAuthModalState = useSetRecoilState(authModalState)
    const logout = async ()=>{
      await signOut(auth)
      resetCommunityState()
    }
    return(
        <Menu>
        <MenuButton
          cursor="pointer"
          padding="0px 6px"
          borderRadius="4px"
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        >

          <Flex alignItems="center">
            <Flex alignItems="center">
            {user? (
                <>
                  <Icon
                    fontSize={23}
                    mr={1}
                    color="black.400"
                    as={GiAbstract111}
                  />
                  <Flex direction="column" display={{base:"none",lg:"flex"}} fontSize="8pt"
                        align="flex-start" mr={8}
                >
                    <Text fontWeight={700}>
                        {user?.displayName || user.email?.split("@")[0]}
                    </Text>
                </Flex>
                  </>
                ) : (
                <Icon fontSize={23} mr={1} color="gray.400" as={VscAccount} />
              )}
                </Flex>
                <ChevronDownIcon/>
                </Flex>
        </MenuButton>
        <MenuList>
            {user ?(
                <>
                <MenuItem fontSize="10pt" fontWeight={700} _hover={{bg:"white", color:"orange.400"}} >
                <Flex align="center">
                    <Icon fontSize={20} mr={2} as={CgProfile} />
                    Profile
                </Flex>
            </MenuItem>
            <MenuDivider/>
            <MenuItem fontSize="10pt" fontWeight={700} _hover={{bg:"white", color:"orange.400"}} 
                      onClick={logout} 
            >
                <Flex align="center">
                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                    Log Out
                </Flex>
            </MenuItem> 
            </>
            ):(
                <>
                <MenuItem fontSize="10pt" fontWeight={700} _hover={{bg:"white", color:"orange.400"}} 
                      onClick={()=> setAuthModalState ({open:true,view:"login"})} 
            >
                <Flex align="center">
                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                    Log In/Sign Out
                </Flex>
            </MenuItem> 
            </>
        )}
        </MenuList>
      </Menu>
    )
 }
 export default UserMenu