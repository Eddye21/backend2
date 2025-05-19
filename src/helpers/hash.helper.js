import { compareSync, hashSync, genSaltSync } from "bcrypt";

const createHash = (password) => hashSync(password, genSaltSync(10))

const compareHash = (password, passwordDb) => compareSync(password, passwordDb)

export { createHash, compareHash }