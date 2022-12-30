const { uuid } = require("uuidv4")
const broadcast = require("../../models/broadcast")
const { api_response, error_responses } = require("../../../utility/responseHelper")

const createBroadCast = async(req,res)=> {
    try {
        const broadcast_id = uuid()
        req.body.broadcast_id = broadcast_id
        const newBroadCastList = new broadcast(req.body)
        await newBroadCastList.save();
        return res.send(api_response(false,{BroadCast:newBroadCastList}))
    }
    catch(err) {
        return res.send(error_responses(err))
    }
}

const getBroadCast = async(req,res) => {
    try {
        const allBroadCast = await broadcast.find({created_by:req.params.created_by})
        return res.send(api_response(false,{allBroadCast}))
    }
    catch(err) {
        return res.send(error_responses("something went wrong"))
    }
}

module.exports = {createBroadCast,getBroadCast}