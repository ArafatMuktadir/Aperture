import {SearchIcon} from "@chakra-ui/icons";
import{
    Flex,
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps={
    user?:User|null
};
const SearchInput:React.FC<SearchInputProps> = ({user})=> {

    return (
        <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} mr={2} align='center'>
            <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='black.300' mb={1} />}
            />
            <Input
             placeholder='Search'
             fontSize='10pt'
             _placeholder={{color:"black.300"}}
             _hover={{
                 bg:'white',
                 border:'1px solid',
                 borderColor:'black.100',
             }}
             _focus={{
                outline:'none',
                border:'1px solid',
                borderColor:'black.100'
             }}
             height='30px'
             bg='grey.200'
            />
         </InputGroup>
        </Flex>
        
    );
};
export default SearchInput;