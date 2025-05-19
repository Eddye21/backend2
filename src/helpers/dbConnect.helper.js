import mongoose from "mongoose";

const dbConnect = async(link) => {
    try {
        await mongoose.connect(link)
        console.log("Database Connected")
        return true
    } catch (error) {
        console.error("Error connecting to database:", error.message)
        throw error
    }
}

export default dbConnect