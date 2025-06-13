const registerCb = (req, res, next) => {
    const { _id } = req.user
    res.json201(_id, "Registered")
}

const loginCb = (req, res, next) => {
    const { _id } = req.user
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 }
    res.cookie("token", req.user.token, opts).json200(_id, "Logged in")
}

const signOutCb = (req, res, next) => res.clearCookie("token").json200("Sign Out")

const forbidden = (req, res, next) => res.json403()

const badAuthCb = (req, res, next) => res.json403()

export { registerCb, loginCb, signOutCb, badAuthCb, forbidden }