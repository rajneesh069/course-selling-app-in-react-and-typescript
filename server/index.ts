import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import adminRoutes from "./routes/adminRoutes"
import userRoutes from "./routes/userRoutes";
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);


app.listen(3000, () => {
    console.log("Server is up and running at 3000");
});