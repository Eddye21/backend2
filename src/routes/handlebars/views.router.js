import { Router } from "express";
import { productManager } from "../../data/managers/db/mongoDb.manager.js";
import passport from "../../middleware/passport.mid.js"

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

const createProductsCb = async(req, res) => {
    try {
        const {data} = req.params
        const products= await productManager.createOne(data)
        res.render("products", {products})
    } catch (error) {
        console.log(error.message)
    }
}

const forbiddenCb = (req, res) => {
    const error = {message: "Access denied", status: "403"}
    res.render("forbidden", {error})
}

const optsForbidden = {session: false, failureRedirect: "/forbidden"}

//Endpoit
viewsRouter.get("/", getProductsCb)
viewsRouter.get("/login", loginCb)
viewsRouter.get("/register", registerCb)
viewsRouter.get("/create", passport.authenticate("admin", optsForbidden),createProductsCb)
viewsRouter.get("/forbidden", forbiddenCb)

export default viewsRouter