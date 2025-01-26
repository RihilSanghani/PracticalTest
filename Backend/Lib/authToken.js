import jwt from "jsonwebtoken";

export const generateAuthToken = (user, res) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('authToken', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true, // Prevents client-side JavaScript access
        sameSite: "Strict", // Ensures cookies are sent only to the same site
        secure: process.env.NODE_ENV === 'development', // Enables secure cookies in production
    })
    return token;
}