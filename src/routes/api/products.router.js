import passport from "../../middleware/passport.mid.js"
import RouterHelper from "../../helpers/router.helper.js";
import { getProductsCb, postProductCb, putProductCb } from "../../controllers/products.controller.js";

const optsForbidden = {session: false, failureRedirect: "/api/auth/forbidden"}

class ProductRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }
    init = () => {
        this.read("/", getProductsCb)
        this.create("/create", passport.authenticate("admin", optsForbidden),postProductCb)
        this.update("/update/:pid", passport.authenticate("admin", optsForbidden),putProductCb)
    }
}

const productRouter = new ProductRouter().getRouter()

export default productRouter
