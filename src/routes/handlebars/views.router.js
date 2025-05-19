import { Router } from "express";
import { productManager } from "../../data/managers/db/mongoDb.manager.js";

const viewsRouter = Router()

const getProductsCb = async(req, res, next) => {
    res.render("index")
}

viewsRouter.get("/", getProductsCb)

export default viewsRouter