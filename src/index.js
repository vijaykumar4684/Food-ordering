import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute.js" 
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute.js";
import restaurantRoute from "./routes/RestaurantRoute.js";
import orderRoute from "./routes/OrderRoute.js";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>console.log("Connected to database"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/health", async (req,res) =>{
    res.send({message:"health ok"});
});

app.use("api/my/user",MyUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(7000,() => {
    console.log("server started on localhost:7000");
});