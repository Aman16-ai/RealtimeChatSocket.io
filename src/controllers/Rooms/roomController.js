import { api_response, error_responses } from '../../../utility/responseHelper'
import { userRooms } from '../../models/rooms'

export const participantsRoom = async(req,res)=> {
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
        
    }
    catch(err) {
        res.send(error_responses("something went wrong"))
    }
}