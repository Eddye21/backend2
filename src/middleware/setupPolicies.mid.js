import { userManager } from "../data/managers/db/mongoDb.manager.js";
import { compareToken } from "../helpers/jwt.helper.js"

const setupPolicies = (policies) => async (req, res, next) => {
    try {
        if (policies.includes("PUBLIC")) return next()
        const token = req?.cookie?.token
        if (!token) return res.json401()
        const data = compareToken(token)
        const { user_id, email, role } = data
        if (!user_id || !email || !role) return res.json401()
        const allowedRoles = {
            USER: policies.includes("USER"),
            ADMIN: policies.includes("ADMIN")
        }
        if (!allowedRoles[role]) return res.json401()
        const user = await userManager.readById(user_id)
        next()
    } catch (error) {
        next(error)
    }
}

export default setupPolicies