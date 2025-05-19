import "dotenv/config.js"
import morgan from "morgan"
import express from "express"
import __dirname from "./utils.js"
import cookieParser from "cookie-parser"
import { engine } from "express-handlebars"
import indexRouter from "./src/routes/index.router.js"
import dbConnect from "./src/helpers/dbConnect.helper.js"

//Server settings
const server = express()
const PORT = process.env.PORT || 8080

//Settings handlebars
server.engine("handlebars", engine)
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

//Server initialize 
server.listen((PORT), dbConnect)