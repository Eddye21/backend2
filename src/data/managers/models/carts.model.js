import mongoose, { Types } from "mongoose";

const cartsSchema = mongoose.Schema({
    product_id: {type: Types.ObjectId, required:true},
    user_id: {type: Types.ObjectId, required: true},

})

const Cart = mongoose.model("cart", cartsSchema)

export default Cart