import { Router } from "express";
import apiRouter from "./api/api.router.js";
import viewsRouter from "./handlebars/views.router.js"

const indexRouter = Router()

indexRouter.use("/", viewsRouter)
indexRouter.use("/api", apiRouter)

export default indexRouter