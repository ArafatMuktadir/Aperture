import React, { useEffect } from "react";
import {
  Flex,
  Text,
  useDisclosure,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInputs from "./Authinputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import ResetPassword from "./ResetPassword";


const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user,loading,error]=useAuthState(auth)

  const handleClose = () =>{
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(()=>{
    if (user) handleClose()
    console.log("user",user)
  }, [user])

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view==="login" && "Login"}
            {modalState.view==="signup" && "Sign Up"}
            {modalState.view==="resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {modalState.view==="login" || modalState.view==="signup"?(
                <>
                  <OAuthButtons/>
                  <Text color="black.200" fontWeight={700}>
                    OR
                  </Text>
                  <AuthInputs/>
                </>
              ) : (
                <ResetPassword/>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal
