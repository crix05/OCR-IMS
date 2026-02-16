import { api } from "../api/client";
import { saveToken } from "./token";

export type LoginRequest = {
    email: string;
    password: string;
}

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
};

export type CreateProfileRequest = {
    phone: string;
    address: string;
    state_name: string;
    pincode: string;
    gst_num: string;
    company_name: string;
}

export type AuthResponse = {
    message: string;
    token: string;
};

export async function loginUser(data: LoginRequest) {
    const res = await api.post<AuthResponse>("/auth/login", data);
    saveToken(res.token);
    return res;
}

export async function registerUser(data: RegisterRequest) { 
    const res = await api.post<AuthResponse>("/auth/register", data); 
    saveToken(res.token); 
    return res; 
}

export async function createUserProfile(data: CreateProfileRequest) {
    const res = await api.post("/auth/createProfile", data, true);
    return res;
}

