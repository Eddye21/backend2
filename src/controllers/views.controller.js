import { readAll } from "../services/products.service.js";

const getProductsCb = async(req, res) => {
    try {
        let products = await readAll()
        return res.status(200).render("index", { products })
    } catch (error) {
        console.log(error.message)
    }
}

const loginCb = (req, res) => {
    res.render("login")
};

const registerCb = (req, res) => {
    res.render("register")
}

const createProductsCb = async(req, res) => {
    res.render("products")
}

const forbiddenCb = (req, res) => {
    const error = {message: "Access denied", status: "403"}
    res.render("forbidden", {error})
}

export {getProductsCb, loginCb, registerCb, createProductsCb,forbiddenCb}