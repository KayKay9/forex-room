"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

type FormVariant = "LOGIN" | "REGISTER";



export const AuthForm = () => {
    const session = useSession();
    const router = useRouter();

    // const formRef = useRef<ElementRef<"form">>(null);

    const [formVariant, setFormVariant] = useState<FormVariant>("LOGIN");

    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/channels");
        }
    }, [session.status, router]);

    const toggleVariant = useCallback(() => {
        if (formVariant === "LOGIN") {
            setFormVariant("REGISTER");
        } else {
            setFormVariant("LOGIN");
        }
    }, [formVariant]);

  
    return (
        <div className="p-6 rounded-md bg-white mt-8 w-full">
            <div className="sm:mx-auto  sm:max-w-md flex flex-col items-center justify-center mb-10 gap-y-2">
                <div className="flex items-center justify-center">
                    <h1>FOREX ROOM</h1>
                </div>
                <div className="space-y-1">
                    <h2 className=" text-2xl text-gray-900 font-bold text-center">
                        {formVariant === "LOGIN" ? "Sign in" : "Create your account"}
                    </h2>
                    <p className="text-sm text-neutral-500 ">
                        {formVariant === "LOGIN"
                            ? "Welcome back! Please sign in to continue."
                            : "Welcome! Please fill in the details to get started."}
                    </p>
                </div>
            </div>

            {formVariant === "LOGIN" ? <LoginForm /> : <RegisterForm />}

            <p
                onClick={toggleVariant}
                className="text-neutral-700 transition hover:opacity-50 hover:underline text-sm text-center mt-8 cursor-pointer"
            >
                {formVariant === "LOGIN" ? "New here ?" : "Already have an account ?"}
            </p>
        </div>
    );
};
