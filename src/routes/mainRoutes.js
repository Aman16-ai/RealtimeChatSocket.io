const broadcastRoutes = require('./broadcastRoutes')
const roomRoutes = require('./roomRoutes')

module.exports = (app)=> {
    roomRoutes(app)
    broadcastRoutes(app)
}