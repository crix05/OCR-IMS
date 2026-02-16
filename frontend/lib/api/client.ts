import { getToken } from "../auth/token";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if(!BASE_URL) {
    throw new Error ('BASE_URL not defined');
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T> (
    endpoint: string,
    method: HttpMethod,
    body?: any,
    authRequired: boolean = false
) : Promise<T> {

    const headers: HeadersInit = {
        "Content-type" : "application/json",
    };
    
    if(authRequired) {
        const token = getToken();
        if(token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    })

    /* Might cause issues */
    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}

export const api = {
    get: <T>(endpoint: string, authRequired: boolean = false) => 
        request<T>(endpoint, "GET", undefined, authRequired),
    post: <T>(endpoint: string, body: any, authRequired: boolean = false) => request<T>(endpoint, "POST", body, authRequired), 
    put: <T>(endpoint: string, body: any, authRequired: boolean = false) => request<T>(endpoint, "PUT", body, authRequired), 
    delete: <T>(endpoint: string, authRequired: boolean = false) => request<T>(endpoint, "DELETE", undefined, authRequired), 
};
