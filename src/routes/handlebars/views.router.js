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

const optsForbidden = {session: false, failureRedirect: "/api/auth/forbidden"}

//Endpoit
viewsRouter.get("/", getProductsCb)
viewsRouter.get("/login", loginCb)
viewsRouter.get("/register", registerCb)
viewsRouter.get("/create", passport.authenticate("admin", optsForbidden),createProductsCb)

export default viewsRouter