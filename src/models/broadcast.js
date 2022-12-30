const mongoose = require("mongoose")
const broadcastShema = new mongoose.Schema({
    broadcast_id : {
        type: String,
        index:{unique:true}
    },
    created_by : {
        type:String,
        require:true
    },
    participants :{
        type:Array
    }
},{timestamps:true})

module.exports = mongoose.model("Broadcast",broadcastShema)