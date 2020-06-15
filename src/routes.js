const express = require('express')
const server = express
const routes = express.Router()
const places = require("./app/controllers/places")


routes.get("/", places.index)

routes.get("/create-point", places.create)

routes.post("/saveplace", places.post)

routes.get("/search", places.search)

module.exports = routes