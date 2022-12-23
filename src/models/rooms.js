// import mongoose,{Schema} from "mongoose"
const mongoose = require('mongoose')
const RoomSchema = new mongoose.Schema({
    room_id: {
        type:String,
        require:true
    },
    participants :{
        type:Array
    }
},{timestamps:true})

export const userRooms = mongoose.model('Rooms',RoomSchema)