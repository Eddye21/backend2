import { Router } from "express";
import passport  from "../../middleware/passport.mid.js";

const authRouter = Router()

//Callbacks

const registerCb = (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const { _id } = req.user
        return res.status(201).json({ message: "Registered", response: _id, method, url })
    } catch (error) {
        next(error)
    }
}

const loginCb = (req, res, next) => {
    try {
        const { method, originalUrl: url } = req
        const { _id } = req.user
        return res.status(201).cookie("token", req.user.token, { maxAge: 7 * 24 * 60 * 60 * 1000 }).json({ message: "Logged in", response: _id, method, url })
    } catch (error) {
        next(error)
    }
}

const signOutCb = (req, res, next) => {
    try {
        const { method, originalUrl: url} = req
        return res.status(200).clearCookie("token").json({
            message: "Sign out",
            method,
            url
        })
    } catch (error) {
        next(error)
    }
}

const forbidden = (req, res, next) => {
    try {
        const { method, originalUrl: url} = req
        return res.status(403).send({message: "Forbidden", method, url})
    } catch (error) {
        next(error)
    }
}

const badAuthCb = (req, res, next) => {
    try {
        const { method, originalUrl: url} = req
        return res.status(400).send({message: "Bad Auth", method, url})
    } catch (error) {
        next(error)
    }
}


const opts = { session: false, failureRedirect: "/api/auth/bad-auth"}
const optsForbidden = { session: false, failureRedirect: "/api/auth/forbidden" }

//Endpoits
authRouter.use("/register", passport.authenticate("register", opts), registerCb)
authRouter.use("/login", passport.authenticate("login", opts), loginCb)
authRouter.use("/signout", passport.authenticate("user", optsForbidden), signOutCb)
authRouter.use("/bad-auth", badAuthCb)
authRouter.use("/forbidden", forbidden)

export default authRouter