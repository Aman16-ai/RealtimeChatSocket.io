const mongoose = require('mongoose')
const mediaSchema = new mongoose.Schema({
    media_id: {
        type:String,
        index:{unique:true}
    },
    filename: {
        type:String,
    },
    filePath :{
        type:String,
        require : true
    }
})

module.exports = mongoose.model('Media',mediaSchema)