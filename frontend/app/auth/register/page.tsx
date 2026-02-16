"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth/authService";
import { styles } from "@/lib/styles/styles";
import Link from "next/link";
import InputField from "@/app/Components'/input";

export default function RegisterPage() {
    return(
        <div className = {styles.wrapper}>
            <RegisterLeft/>
            <RegisterRight/>
        </div>
    )
}

export function RegisterLeft() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            await registerUser({ name, email, password });
            router.push("/auth/createProfile");
        } catch(err: any) {
            setError(err.message || "Login Failed");
            console.log("Error: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className = {styles.horizontalHalf}
        >
            <div className = {styles.loginWrapper}>
                <div className = "flex flex-col">
                    <h1 className = {styles.title + " mb-3"}> Welcome &#128075; </h1>
                    <div className = {styles.body}> Let's get you started.</div>
                    <div className = {styles.body}> Create an account to start managing your products.</div>
                </div>


                <form className = {styles.formWrapper} onSubmit={handleLogin}>

                    <InputField 
                        label = "Name"
                        name = "name"
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        type = "text"
                        placeholder = "John Doe"
                    />                    

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

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className = {styles.onboardingButton + " mt-6"}
                    >
                    {isLoading ? "Signing up..." : "Sign up"}
                    </button>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                    <div className = "font-nunito flex justify-center text-secondary text-label m-2">
                        <div> Already have an account? 
                            <Link
                                href = "\login"
                                className = " text-link cursor-pointer"
                            > Sign in 
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export function RegisterRight() {
    return(
        <div className = {styles.horizontalHalf}>
            <div className={`${styles.bg} bg-blue-600`}></div>
        </div>
    );
}