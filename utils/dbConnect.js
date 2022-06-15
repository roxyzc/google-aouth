import mongoose from "mongoose";

export const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("Connected to database successfuly"))
        .catch(() => console.log("Error while connecting to database"));
};