import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: 'Tüm alanlar zorunludur' });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'Email zaten kayıtlı' });

        const user = await User.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Email ve şifre gerekli ' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Şifre hatalı' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}