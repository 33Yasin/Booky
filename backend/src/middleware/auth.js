import jwt from "jsonwebtoken";

// Middleware to authenticate requests using JWT
const auth = (req, res, next) => {
  // Extract the token from the Authorization header (format: "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, return a 401 Unauthorized response
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information (e.g., userId) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch {
    // If token is invalid or expired, return a 401 Unauthorized response
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
