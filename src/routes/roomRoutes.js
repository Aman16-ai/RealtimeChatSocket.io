// const { participantsRoom } = require("../controllers/Rooms/roomController");
const participantsRoom = require("../controllers/Rooms/roomController")
const {getRoomAllChats} = require("../controllers/Chats/chatController")
module.exports = (app)=> {
    app.post("/participantsRoom",participantsRoom)
    app.get("/getAllChats/:room_id",getRoomAllChats)
} 