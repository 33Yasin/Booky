import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // <-- auth rotalarını mount ediyoruz ([src/routes/auth.js](src/routes/auth.js))

app.get('/', (req, res) => {
    res.send('Backend çalışıyor!');
});

// basit global hata middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});