import { productManager } from "../data/managers/db/mongoDb.manager.js";

const readAll = async() => await productManager.readAll()
const readById = async(pid) => await productManager.readById(pid)
const readAllByFilter = async(filter) => await productManager.readAll(filter) 
const destroyById = async(pid) => await productManager.destroyById(pid)
const createOne = async(data) => await productManager.createOne(data)
const updateById = async(pid, data) => await productManager.updateById(pid, data)

export {readAll, readById, readAllByFilter, destroyById, updateById, createOne} 