import { productManager } from "../data/managers/db/mongoDb.manager.js";

const readAll = async() => await productManager.readAll()
const readById = async(pid) => await productManager.readById(pid)

export {readAll, readById}