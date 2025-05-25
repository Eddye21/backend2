import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: {type: String, default: "USER"}
})

const User = mongoose.model("users", userSchema)

export default User