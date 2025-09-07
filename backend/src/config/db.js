import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Veritabanı bağlantısı başarılı")
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;