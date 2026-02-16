"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth/authService";
import { styles } from "@/lib/styles/styles";
import InputField from "@/app/Components'/input";
import Link from "next/link";

export default function LoginPage() {
    return(
        <div className = {styles.wrapper}>
            <LoginLeft/>
            <LoginRight/>
        </div>
    )
}

export function LoginLeft() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const res = await loginUser({ email, password });
            if(res.message == 'dashboard') {
                router.push("/auth/createProfile");
            } else {
                router.push("/auth/createProfile");
            }
            
        } catch(err: any) {
            setError(err.message || "Login Failed");
            console.log("Error: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className = {styles.horizontalHalf + " "}
        >
            <div className = {styles.loginWrapper}>
                <div className = "flex flex-col">
                    <h1 className = {styles.title + " mb-3"}> Welcome Back &#128075; </h1>
                    <div className = {styles.body}> Today is a new day. It's your day. You shape it.</div>
                    <div className = {styles.body}> Sign in to start managing your products.</div>
                </div>


                <form className = {styles.formWrapper} onSubmit={handleLogin}>

                    <InputField 
                        label = "Email"
                        name = "email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        type = "email"
                        placeholder = "johndoe@gmail.com"
                    />

                    <InputField 
                        label = "Password"
                        name = "password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        type = "password"
                        placeholder = "At least 8 characters"
                    />

                    <div className = "flex w-full justify-end my-1">
                        <Link 
                            className = "font-nunito text-link cursor-pointer"
                            href = "\dashboard"
                            > Forgot Password? 
                        </Link>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className = {styles.onboardingButton}
                    >
                    {isLoading ? "Signing in..." : "Sign in"}
                    </button>

                    {/* Comment this in prod */}
                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                    <div className = "font-nunito flex justify-center text-secondary text-label m-2">
                        <div> Don't have an account? 
                            <Link
                                href = "/auth/register"
                                className = " text-link cursor-pointer"
                            > Sign up 
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export function LoginRight() {
    return(
        <div className = {styles.horizontalHalf}>
            <div className={`${styles.bg} bg-blue-600`}></div>
        </div>
    );
}


