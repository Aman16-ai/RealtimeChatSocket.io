// import { uuid } from 'uuidv4'
// import { api_response, error_responses } from '../../../utility/responseHelper'
// import { userRooms } from '../../models/rooms'

const uuid = require("uuidv4")
const {api_response,error_responses} = require('../../../utility/responseHelper')
const createRoom = async(user1,user2) => {
    const uuid = uuid()
    const room = await userRooms({
        room_id:uuid,
        participants:[user1,user2]
    })
    room.save();
    return room;
}
module.exports = participantsRoom = async(req,res)=> {
    try {
        const {user1,user2} = req.body;
        const rooms = await userRooms.find({})
        console.log(rooms)
        let isUser1ExistsInRoom = false;
        let isUser2ExistsInRoom = false;
        rooms.forEach((room)=> {
            let participants = room.participants
            for(let i=0;i<participants.length;i++) {
                if(participants[i] === user1) {
                    isUser1ExistsInRoom = true;
                }
                if(participants[i] === user2) {
                    isUser2ExistsInRoom = true;
                }
                if(isUser1ExistsInRoom && isUser2ExistsInRoom) {
                    res.send(api_response(false,{room:room}))
                }
            }
        })
        const room = await createRoom(user1,user2)
        res.send(api_response(false,{room:room}))
        
    }
    catch(err) {
        res.send(error_responses("something went wrong"))
    }
}