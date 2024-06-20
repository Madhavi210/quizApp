import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config();

const url : string | undefined = process.env.MONGO_URI;
if(!url){
    throw new Error("please provide url in dotenv file")
}

 const connectDB = async() =>{
    mongoose.connect(url)
        .then(() =>{
            console.log("connection successful");
        })
        .catch((error:any) =>{
            console.log("failed to connect", error);
        })
} 

export default connectDB;

