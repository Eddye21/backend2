import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Strategy as localStrategy } from "passport-local";
import { userManager } from "../data/managers/db/mongoDb.manager.js";
import { createHash, compareHash } from "../helpers/hash.helper.js"
import { createToken } from "../helpers/jwt.helper.js"

passport.use(
    "register",
    new localStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                if (!req.body.first_name || !req.body.last_name || !req.body.age) {
                    const error = new Error("Invalid Data")
                    error.statusCode = 400
                    throw error
                }
                let user = await userManager.readBy({ email })
                if (user) {
                    const error = new Error("Invalid Credentials")
                    error.statusCode = 401
                    throw error
                }
                req.body.password = createHash(password)
                user = await userManager.createOne(req.body)
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "login",
    new localStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let user = await userManager.readBy({ email })
                if (!user) {
                    const error = new Error("Invalid Credentials")
                    error.statusCode = 401
                    throw error
                }
                const verifyPass = compareHash(password, user.password)
                if (!verifyPass) {
                    const error = new Error("Invalid Credentials")
                    error.statusCode = 401
                    throw error
                }
                const data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role
                }
                const token = createToken(data)
                user.token = token
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "user",
    new jwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: process.env.SECRET
        },
        async (data, done) => {
            try {
                const { email, role } = data
                const user = await userManager.readBy({ email, role })
                if (!user) {
                    const error = new Error("Forbidden")
                    error.statusCode = 403
                    throw error
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "admin",
    new jwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: process.env.SECRET,
        },
        async (data, done) => {
            try {
                const { user_id, email, role } = data;
                const user = await userManager.readBy({ _id: user_id, email, role });
                if (!user || user.role !== "ADMIN") {
                    return done(null, null, { message: "Forbidden", statusCode: 403 });
                }
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

export default passport