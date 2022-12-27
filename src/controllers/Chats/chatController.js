const {api_response,error_responses} = require('../../../utility/responseHelper')
const {uuid} = require("uuidv4")
const messages = require('../../models/messages')
const chats = require('../../models/chats')
const getRoomAllChats = async (req,res) => {
    try {
        const room_id = req.params.room_id
        console.log(room_id)
        const userchats = await chats.findOne({room_id:room_id}).populate({
            path:"messages",
            Model:"Messages"
        })
        // console.log(userchats)
        res.send(api_response(false,userchats))
    }
    catch(err) {
        res.send(error_responses("something went wrong"))
    }
}

const saveMessageToRoom = async (room_id,message)=> {
    try {
        const chat = await chats.findOne({room_id:room_id})
        // console.log(chat)
        const message_id = uuid()
        message.message_id = message_id
        const newMessage = await messages(message)
        newMessage.save()
        if(chat !== null && chat !== undefined) {
            chat.messages.push(newMessage._id)
            chat.save()
        }
        else {
            const newChat = await chats({
                room_id:room_id,
                messages : [newMessage._id]
            })
            newChat.save()
        }
        return message_id
    }
    catch(err) {
        console.log("something went wrong")
    }
}

const addReactionToMessage = async (message_id,reaction_id)=> {
    try {
        const message = await messages.findOne({message_id:message_id})
        message.reaction_id = reaction_id
        await message.save()
        console.log(message)
    }
    catch(err) {
        console.log(err)
    }
}

const replyToMessage = async(message_id,reply_message_id)=>{
    try {
        const message = await messages.findOneAndUpdate({message_id:message_id},{reply_message_id:reply_message_id})
        await message.save();
        console.log(message)
    }
    catch(err) {
        console.log(err);
    }
}
module.exports = {getRoomAllChats,saveMessageToRoom,addReactionToMessage,replyToMessage}