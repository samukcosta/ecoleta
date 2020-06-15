const express = require("express")
const server = express()
const nunjucks = require("nunjucks")
const routes = require("./routes")

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))
server.use(routes)

nunjucks.configure("src/app/views", {
    express: server,
    noCache: true
})



server.listen(3000)