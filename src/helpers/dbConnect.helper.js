import mongoose from "mongoose";

const dbConnect = async(link, port) => {
    try {
        await mongoose.connect(link)
        console.log("Database Connected")
        console.log(`Server online on port : http://localhost:${port}`)
        return true
    } catch (error) {
        console.error("Error connecting to database:", error.message)
        throw error
    }
}

export default dbConnect