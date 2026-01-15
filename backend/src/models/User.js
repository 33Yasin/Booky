import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User schema structure
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save middleware to hash the password before saving a user
// Note: We use a regular function here to access 'this' which refers to the document being saved
UserSchema.pre("save", async function (next) {
  // If the password field hasn't been modified, skip hashing
  if (!this.isModified("password")) return next();

  // Hash the password with a salt factor of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare a candidate password with the hashed password stored in the database
UserSchema.methods.comparePassword = async (
  candidatePassword,
  hashedPassword
) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export default mongoose.model("User", UserSchema);
