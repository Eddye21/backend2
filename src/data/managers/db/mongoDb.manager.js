import User from "../models/users.model.js";
import Cart from "../models/carts.model.js";
import Products from "../models/products.model.js";

class Manager {
    constructor(model){
        this.model = model
    }

    createOne = async(data) => await this.model.create(data)
    readAll = async(filter) => await this.model.find(filter).lean()
    readById = async(id) => await this.model.findOne({_id: id}).lean()
    readBy = async(filter) => await this.model.findOne (filter).lean()
    updateById = async(id, data) => await this.model.findByIdAndUpdate(id, data, {new: true})
    destroyById = async(id) => await this.model.findByIdAndDelete(id)
}

const userManager = new Manager(User)
const productManager = new Manager(Products)
const cartManager = new Manager(Cart)

export {userManager, productManager, cartManager}