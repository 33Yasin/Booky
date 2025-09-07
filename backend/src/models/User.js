import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// pre-save: burada normal function kullanmak gerekiyor çünkü `this` mongoose doc
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// comparePassword: arrow function ile yazılabilir
UserSchema.methods.comparePassword = async (pw, passwordHash) => {
  return await bcrypt.compare(pw, passwordHash);
};

export default mongoose.model('User', UserSchema);