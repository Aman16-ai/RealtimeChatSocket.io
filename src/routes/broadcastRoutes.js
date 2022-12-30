const { createBroadCast, getBroadCast } = require("../controllers/Broadcast/broadcastController")


module.exports = (app)=> {
    app.post("/createBroadCastList",createBroadCast)
    app.get("/getBroadCastLists/:created_by",getBroadCast)
}