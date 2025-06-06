import { Router } from "express";
import passport from "../../middleware/passport.mid.js"
import { productManager } from "../../data/managers/db/mongoDb.manager.js";

const productRouter = Router()


//Callback
const getProductsCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const products = await productManager.readAll()
        return res.status(200).send({ products, method, url })
    } catch (error) {
        next(error)
    }
}

const postProductCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const data = req.body
        if (!data.title || !data.description || !data.code || !data.price || !data.stock) { return res.status(401).send({ message: "Invalid Data" }) }
        const product = await productManager.createOne(data)
        res.status(201).send({ message: "Success Create", payload: product, method, url })
    } catch (error) {
        next(error)
    }
}

const putProductCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const { pid } = req.params
        const data = req.body
        const updateProduct = await productManager.updateById(pid, data)
        res.status(201).send({ message: "Product update success", payload: updateProduct, method, url, })
    } catch (error) {
        next(error)
    }
}

const optsForbidden = {session: false, failureRedirect: "/api/auth/forbidden"}

//Endpoit
productRouter.get("/", getProductsCb)
productRouter.post("/create", passport.authenticate("admin", optsForbidden),postProductCb)
productRouter.put("/update/:pid", passport.authenticate("admin", optsForbidden),putProductCb)

export default productRouter
