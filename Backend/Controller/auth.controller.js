import { generateAuthToken } from "../Lib/authToken.js";
import UserModels from "../Models/User.models.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        if (!username && !password && !email) {
            return res.status(400).send({ message: "All fields are required" });
        }

        //Check if username already exists
        const user = await UserModels.findOne({ email });
        if (user) {
            return res.status(400).send({ message: "Username already exists" });
        }

        // password must be atleast six character
        if (password.length < 6) {
            return res.status(400).send({ message: "Password must be at least 6 characters long" });
        }

        // encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new user
        const newUser = new UserModels({ username, email, password: hashedPassword });

        //Save the user
        const token = generateAuthToken(newUser._id)
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser, authToken: token });

    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log("Error in signUp Controller", err);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password && !email) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: "Invalid password" });
        }
        const token = generateAuthToken(user._id);
        res.json({ authToken: token });

    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log("Error in login Controller", err);

    }
}

export const checkUser = async (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
        console.log("Error in checkUser Controller", err);
    }
}