import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register Controller
// Handles user registration by validating input, checking existing users, and creating a new user.
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email is already registered" });

    // Create a new user with the provided details
    const user = await User.create({ name, email, password });

    // Generate a JSON Web Token (JWT) for the new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Respond with the token and user details (excluding password)
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    // Handle potential server errors
    res.status(500).json({ message: err.message });
  }
};

// Login Controller
// Handles user login by verifying credentials and generating a JWT.
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Input
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Respond with the token and user details
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    // Handle potential server errors
    res.status(500).json({ message: err.message });
  }
};
