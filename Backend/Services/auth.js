import { findUserByEmail, createUser, createUserProfile } from "../Models/model.js";
import { hashPassword } from "../Utils/Password.js";
import bcrypt from "bcrypt";

export async function registerUser(details) {
    const existingUser = await findUserByEmail(details.email);
    if (existingUser) {
        throw new Error('User already exists');
    } 

    const hashedPassword = await hashPassword(details.password);
    const user = await createUser({ ...details, password: hashedPassword });

    return user;
}

export async function validateUser(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return user;
}

export async function createProfile(profile) {
    const userProfile = await createUserProfile(profile);
    if(!userProfile) {
        throw new Error('Profile not created');
    }
    return userProfile;
}