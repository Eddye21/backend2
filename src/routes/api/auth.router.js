import passport from "../../middleware/passport.mid.js";
import RouterHelper from "../../helpers/router.helper.js";
import { registerCb, loginCb, signOutCb, badAuthCb, forbidden } from "../../controllers/auth.controller.js";

const opts = { session: false, failureRedirect: "/api/auth/bad-auth" }
const optsForbidden = { session: false, failureRedirect: "/api/auth/forbidden" }

//Endpoits

class AuthRouter extends RouterHelper {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.use("/register", passport.authenticate("register", opts), registerCb)
        this.create("/login", passport.authenticate("login", opts), loginCb)
        this.use("/signout", passport.authenticate("user", optsForbidden), signOutCb)
        this.use("/bad-auth", badAuthCb)
        this.use("/forbidden", forbidden)
    }
}

const authRouter = new AuthRouter().getRouter()

export default authRouter