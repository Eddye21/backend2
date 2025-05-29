import "dotenv/config.js"
import morgan from "morgan"
import express from "express"
import __dirname from "./utils.js"
import cookieParser from "cookie-parser"
import { engine } from "express-handlebars"
import indexRouter from "./src/routes/index.router.js"
import dbConnect from "./src/helpers/dbConnect.helper.js"
import errorHandler from "./src/middleware/errorHandler.mid.js"

//Server settings
const server = express()
const PORT = process.env.PORT || 8080
const connect = dbConnect(process.env.LINK_DB, PORT)

//Settings handlebars
server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")

//Middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + "/public"))

server.use(cookieParser(process.env.SECRET))
server.use(morgan("dev"))

//Endpoint
server.use("/", indexRouter)
server.use((req ,res) => {
    const error = {message: "Pagina no encontrada", status: 404}
    res.status(404).render("error", {error})
})

//Server initialize 
server.listen((PORT), connect)