import { Router } from "express";
import { productManager } from "../../data/managers/db/mongoDb.manager.js";

const viewsRouter = Router()

//Callback

const getProductsCb = async(req, res) => {
    try {
        const products = await productManager.readAll()
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

//Endpoit
viewsRouter.get("/", getProductsCb)
viewsRouter.get("/login", loginCb)
viewsRouter.get("/register", registerCb)

export default viewsRouter