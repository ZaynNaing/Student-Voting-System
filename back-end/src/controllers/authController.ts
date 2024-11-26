import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(__dirname, "../data/users.json");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Helper function to load users from the file
const loadUsers = (): any[] => {
    if (fs.existsSync(usersFilePath)) {
        const usersData = fs.readFileSync(usersFilePath, "utf-8");
        return JSON.parse(usersData);
    }
    return [];
};

// Helper function to save users to the file
const saveUsers = (users: any[]): void => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const signup: RequestHandler<unknown, { message: string }, { email: string; password: string }, unknown> = (req, res, next) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
    }

    // Load existing users
    const users = loadUsers();

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        res.status(409).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Add new user
    users.push({ email, password: hashedPassword });
    saveUsers(users);

    res.status(201).json({ message: "User created successfully." });
};

export const login: RequestHandler<
    unknown,
    { token?: string; message: string },
    { email: string; password: string },
    unknown
> = (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
    }

    // Load users
    const users = loadUsers();
    console.log(users)

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
        res.status(404).json({ message: "User not found." });
    }

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful." });
};

