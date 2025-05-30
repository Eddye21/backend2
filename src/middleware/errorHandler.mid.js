const errorHandler = (req, res) => {
    const error = {message: "Pagina no encontrada", status: 404}
    res.render("error", {error})
}


export default errorHandler