import passport from "../../middleware/passport.mid.js"
import { getProductsCb, loginCb, registerCb, createProductsCb, forbiddenCb } from "../../controllers/views.controller.js";
import RouterHelper from "../../helpers/router.helper.js";


const optsForbidden = { session: false, failureRedirect: "/forbidden" }

//Endpoit
class ViewsRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }

    init = () => {
        this.read("/", getProductsCb)
        this.read("/login", loginCb)
        this.read("/register", registerCb)
        this.read("/create", passport.authenticate("admin", optsForbidden), createProductsCb)
        this.read("/forbidden", forbiddenCb)
    }
}

const viewsRouter = new ViewsRouter().getRouter()

export default viewsRouter