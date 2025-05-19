import { Router } from "express";
import sessionsRouter from "./sessions.router.js";
import productRouter from "./products.router.js";
import authRouter from "./auth.router.js";

const apiRouter = Router()

apiRouter.use("/sessions", sessionsRouter)
apiRouter.use("/products", productRouter)
apiRouter.use("/auth", authRouter)

export default apiRouter