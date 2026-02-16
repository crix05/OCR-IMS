"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth/authService";
import { styles } from "@/lib/styles/styles";
import Link from "next/link";
import InputField from "@/app/Components'/input";
import { getToken } from "@/lib/auth/token";
import { createUserProfile } from "@/lib/auth/authService";
import Dropdown from "@/app/Components'/dropDown";

export default function createProfile() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        phone: "",
        address: "",
        state_name: "",
        pincode: "",
        gst_num: "",
        company_name: ""
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const token = getToken();

            await createUserProfile({ ...formData })
            router.push("/dashboard");
        } catch(err: any) {
            setError(err.message || "Login Failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className = {styles.wrapper + " justify-center items-center"}
        >
            <div className = "flex flex-col gap-6 w-full max-w-175 min-w-55">
                <div className = "flex flex-col items-center">
                    <h1 className = {styles.title + " mb-3"}> Create your profile </h1>
                    <div className = {styles.body}> Today is a new day. It's your day. You shape it.</div>
                    <div className = {styles.body}> Sign in to start managing your products.</div>
                </div>


                <form className = "flex flex-col gap-6" onSubmit={handleLogin}>

                    <div className = {styles.inputWrapper}>

                        <InputField 
                            label = "Mobile No."
                            name = "phone"
                            value = {formData.phone}
                            onChange = {handleChange}
                            type = "text"
                            placeholder = "Enter 10-digit mobile number"
                        /> 

                        <InputField 
                            label = "Address"
                            name = "address"
                            value = {formData.address}
                            onChange = {handleChange}
                            type = "text"
                            placeholder = "Enter your address"
                        />                        

                        <Dropdown 
                            label="State"
                            name="state_name"
                            value={formData.state_name}
                            onChange={handleChange}
                            options={indianStates}
                        />

                        <InputField 
                            label="Pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter your pincode (e.g. 400069)"
                        />

                        <InputField 
                            label="GST Number"
                            name="gst_num"
                            value={formData.gst_num}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter GST number (e.g. 27ABCDE1234F1Z5)"
                        />

                        <InputField 
                            label="Organization"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter organization name"
                        />
                    </div>
                    

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className = "p-3 mt-5 bg-secondary rounded-xl font-nunito text-body transition duration-300 cursor-pointer hover:shadow-3xl w-full"
                    >
                    {isLoading ? "Signing in..." : "Sign in"}
                    </button>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

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

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];


