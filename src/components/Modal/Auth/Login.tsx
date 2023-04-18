import { authModalState } from "@/src/atoms/authModalAtom";
import {Button, Flex, Input, Text} from "@chakra-ui/react"
import React,{useState} from "react"
import { useSetRecoilState } from "recoil";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth"
import {auth} from "../../../firebase/clientApp"
import { FIREBASE_ERRORS } from "@/src/firebase/errors";

type LoginProps={};

const Login: React.FC<LoginProps>=()=>{
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loginFrom, setLoginForm]=useState({
        email:"",
        password:"",
    })
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        signInWithEmailAndPassword(loginFrom.email,loginFrom.password)
    };
    const onChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm((prev)=>({
            ...prev,
            [event.target.name]:event.target.value,
        }));
    };

    function toggleView(arg0: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name="email"
                placeholder="email"
                type="email"
                mb={2}
                onChange={onChange}
                fontSize="13px"
                _placeholder={{color:"black.500"}}
            />
            <Input
                required
                name="password"
                placeholder="password"
                type="password"
                mb={2}
                onChange={onChange}
                fontSize="13px"
                _placeholder={{color:"black.500"}}
            />
            
            <Text textAlign="center" color="red" fontSize="10pt">
                {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            
            <Button width="100%" height="36px" type="submit" isLoading={loading}>
                Log In
            </Button>
            <Flex justifyContent="center" mb={2}>
        <Text fontSize="10pt" mr={1}>
            Forgot your password?
        </Text>
        <Text
          fontSize="10pt"
          color="blue.400"
          cursor="pointer"
          onClick={()=>
            setAuthModalState((prev)=>({
               ...prev,
               view:"resetPassword",
            }))
           }
        >
            Reset
        </Text>

      </Flex>
            
            <Flex fontSize="10pt" justifyContent="center">
                <Text mr={1}>New Here?</Text>
                <Text
                    color="green.400"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={()=>
                     setAuthModalState((prev)=>({
                        ...prev,
                        view:"signup"
                     }))
                    }
                >
                    Sign Up
                </Text>
            </Flex>
        </form>
    )
}
export default Login