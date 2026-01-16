require("dotenv").config();
const cors = require("cors");
const express = require("express");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use("/api/course", courseRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

const connectDB = require("./db");

connectDB();

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
