var jsonServer = require('json-server')
var path = require('path')

var server = jsonServer.create()
var router = jsonServer.router(path.join(__dirname, 'data.json'))
var middlewares = jsonServer.defaults()


server.use(jsonServer.rewriter({
	'/api/': '/',
}))

server.use(middlewares)
server.use(router)

server.listen(3000, function () {
	console.log('JSON Server is running')
})