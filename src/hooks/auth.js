import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "lib/firebase";
import { useState } from "react";
import { DASHBOARD } from "lib/routes"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth);

    return { user: authUser, isLoading, error };
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast(); //from ChakraUI
    const navigate = useNavigate();

    async function login({email, password, redirectTo=DASHBOARD}) {
        setLoading(true);
        
        try{
        await signInWithEmailAndPassword(auth, email, password)
        toast({
            title: "You are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        });
        navigate(redirectTo)
        } catch (error) {
            toast({
                title: "Logging in failed",
                description: error.message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,             
            });
            return false; //return false if login failed
        }
        setLoading(false);
        return true; //return true if login succeeded
    }

    return {login, isLoading}
}