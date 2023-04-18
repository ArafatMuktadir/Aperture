import {ChevronDownIcon} from "@chakra-ui/icons"
import {Menu,MenuButton,MenuList,MenuItem, Button, Box, Flex, Icon, MenuDivider} from "@chakra-ui/react"
import React from "react"
import {BiHomeAlt} from "react-icons/bi"
import { CgCommunity } from "react-icons/cg"
import Communities from "./Communities"

 const UserMenu:React.FC=()=>{
    return(
        <Menu>
        <MenuButton
          cursor="pointer"
          padding="0px 6px"
          borderRadius="4px"
          mr={1}
          ml={{outline:"1px solid", outlineColor:"gray.100"}}
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        >

          <Flex align="center" justify="space-between">
            <Flex align="center">
                <Icon fontSize={23} mr={{base:1,md:1}} as={BiHomeAlt}/>
            </Flex>
                <ChevronDownIcon/>
                </Flex>
        </MenuButton>
        <MenuList>
            <Communities/>
        </MenuList>
      </Menu>
    )
 }
 export default UserMenu