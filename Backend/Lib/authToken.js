import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}