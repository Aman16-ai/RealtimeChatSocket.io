// import mongoose ,{Schema} from "mongoose"
const mongoose = require('mongoose')

const messageModel = new mongoose.Schema({
    sent_by:{
        type:String,
        require:true
    },
    message_id:{
        type:String,
        require:true,
        index:{unique:true}
    },
    message:{
        type:String,
    },
    reaction_id:{
        type:String,
    },
    media_ids:{
        type:Array
    },
    reply_message_id:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('Messages',messageModel)