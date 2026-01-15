import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successful");
  } catch (err) {
    // Log the error if the connection fails
    console.error("Database connection failed:", err);
    // Exit the process with a failure code (1) to indicate an error
    process.exit(1);
  }
};

export default connectDB;
