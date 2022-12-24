// import mongoose,{Schema} from "mongoose"
const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    room_id:{
        type:String,
        require:true,
        index:{unique:true}
    },
    messages: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Messages",
        }
    ]
})

module.exports = mongoose.model("Chats",ChatSchema)