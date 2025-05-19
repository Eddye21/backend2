import mongoose from "mongoose";

const collection = "products"
const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: {type: String, default: "image"},
    price: Number,
    code: String,
    stock: Number,
    status: {type: Boolean, default: true}
})

const Products = mongoose.model(collection, productsSchema)

export default Products