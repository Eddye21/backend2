import { readAll, createOne, updateById, readAllByFilter } from "../services/products.service.js"

const getProductsCb = async (req, res) => {
    const products = await readAll()
    res.json200(products)
}

const getProductsFilterCb = async (req, res, next) => {
    const filter = req.query
    const product = await readAllByFilter(filter)
    res.json(product)
}

const postProductCb = async (req, res, next) => {
    const data = req.body
    if (!data.title || !data.description || !data.code || !data.price || !data.stock) { return res.status(401).send({ message: "Invalid Data" }) }
    const product = await createOne(data)
    res.json201(product)
}

const putProductCb = async (req, res, next) => {
    const { pid } = req.params
    const data = req.body
    const updateProduct = await updateById(pid, data)
    res.json201(updateProduct, "Edit Success")
}

export { getProductsCb, getProductsFilterCb, postProductCb, putProductCb }