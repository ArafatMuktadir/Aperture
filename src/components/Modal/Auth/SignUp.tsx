import { authModalState } from "@/src/atoms/authModalAtom";
import { Input, Button, Flex , Text} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth, firestore } from "../../../firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";


const SignUp:React.FC=()=> {
    const setAuthModalState=useSetRecoilState(authModalState);
    const [signUpForm,setSignUpForm]=useState({

        email:"",
        password:"",
        confirmPassword:"",
    })
    const [error,setError]=useState('')
    const [
        createUserWithEmailAndPassword,
        userCred,
        loading,
        userError,
      ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        if (error) setError('')

        if (signUpForm.password!==signUpForm.confirmPassword){
            setError('Passwords do not match')
            return
        }
        createUserWithEmailAndPassword(signUpForm.email,signUpForm.password)
    };

    const onChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setSignUpForm((prev)=>({
            ...prev,
            [event.target.name]:event.target.value,
        }));
    };


    const createUserDocument=async(user:User)=>{
        await addDoc(collection(firestore,"users"), JSON.parse(JSON.stringify(user)))
    }

    useEffect(()=>{
        if (userCred){
            createUserDocument(userCred.user)
        }
    }, [userCred]);

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
            <Input
                required
                name="confirmPassword"
                placeholder="confirm password"
                type="password"
                mb={2}
                onChange={onChange}
                fontSize="13px"
                _placeholder={{color:"black.500"}}
            />
            <Text textAlign="center" color="red" fontSize="10pt">
                {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>

            <Button width="100%" height="36px" type="submit" isLoading={loading}>
                Sign Up
            </Button>
            <Flex fontSize="10pt" justifyContent="center">
                <Text mr={1}>Already have an account?</Text>
                <Text
                    color="green.400"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={()=>
                     setAuthModalState((prev)=>({
                        ...prev,
                        view:"login"
                     }))
                    }
                >
                
                    Log In
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp
