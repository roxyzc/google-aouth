import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profile: {
        type: String,
        required: true,
    }
}, {timestamps: true});

userSchema.method("toJSON", function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

const User = mongoose.model("auth-emails", userSchema);
export default User;