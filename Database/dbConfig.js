import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async(req,res)=>{
    try {
        const mongoURL = process.env.MONGODBCONNECTIONSTRING
        console.log(mongoURL);
        const connection = mongoose.connect(mongoURL)
        console.log("connected to the mongoDb");
        return connection;
    } catch (error) {
        console.log(error);
    }
}
export default connectDb;