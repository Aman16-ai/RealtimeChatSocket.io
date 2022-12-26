const { uuid } = require("uuidv4")
const chatMedia = require("../../models/media")

const saveMedia = async(filename,path)=> {
    try {
        const media_id = uuid()
        const newMedia = new chatMedia({
            media_id : media_id,
            filename:filename,
            filePath:path
        })
        await newMedia.save();
        return media_id;
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = saveMedia