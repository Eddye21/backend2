import { Router } from "express";
import { productManager } from "../../data/managers/db/mongoDb.manager.js";

const viewsRouter = Router()

viewsRouter.get("/", async(req, res) => {
    try {
        const products = await productManager.readAll()
        res.status(200).render("index", products)
    } catch (error) {
        console.log(error.message)
    }
})

export default viewsRouter