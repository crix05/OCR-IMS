import { registerUser, validateUser, createProfile } from "../Services/auth.js";
import { generateToken } from "../Utils/jwt.js";

export async function handleRegisterUser(req, res) {
    try {
        const details = req.body;

        if(!details.name || !details.email || !details.password || !details.role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await registerUser(details);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        if (error.message === 'User already exists') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await validateUser(email, password);
        const token = generateToken({ id: user.id, email: user.email, uid: user.uid, role: user.role });

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        if (error.message == 'User not found' || error.message == 'Invalid password') {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

export async function handleProfileCreation(req, res) {
    try {
        const profile = req.body;
        if(
            !profile.uid ||
            !profile.company_name?.trim() ||
            !profile.phone?.trim() ||
            !profile.address?.trim() ||
            !profile.pincode ||
            !profile.state_name?.trim() ||
            !profile.gst_num?.trim()
        ) {
            return res.status(400).json({ error: 'Please enter all fields correctly'});
        }
        const profileCreation = await createProfile(profile);
        res.status(200).json({ message:'Profile created successfully', profileCreation});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}