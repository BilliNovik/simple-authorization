import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import auth from "./routes/auth.js";

const app = express()
const PORT = process.env.port || 5000
const contentDB = () => mongoose.connect(process.env.DB)

app.use(express.json())
app.use('/auth', auth)

contentDB()
    .then(() => app.listen(PORT, () => console.log(`work ${PORT}`)))
