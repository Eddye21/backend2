import authRouter from "./auth.router.js";
import productRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import RouterHelper from "../../helpers/router.helper.js";

class ApiRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.use("/sessions", sessionsRouter)
        this.use("/products", productRouter)
        this.use("/auth", authRouter)
    }
}

const apiRouter = new ApiRouter().getRouter()

export default apiRouter