const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const routes = require("./src/routes/mainRoutes")
const { saveMessageToRoom, addReactionToMessage, replyToMessage } = require('./src/controllers/Chats/chatController')
const fs = require('fs')
const path = require('path')
const saveMedia = require('./src/controllers/Chats/mediaController')
const db_url = process.env.MONGODB
const app = express();
const server = http.createServer(app)

app.use(express.json())
routes(app)

mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err)=>{
    console.log("Mongo db connection error", err)
});


app.get('/',(req,res)=> {
    return res.sendFile(__dirname+"/index.html")
})

app.get('/test',(req,res)=> {
    return res.json({message:'running'})
})

const io = new Server(server,{
    cors: {
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=> {
    console.log(`User connected ${socket.id}`)

    socket.on('join_room',(data)=> {
        console.log(data)
        const {name,room} = data;
        socket.join(room);

        socket.emit('received_message_user',{message:"user"})
        socket.to(room).emit('received_message_user',{
            message : `${name} joined`
        })

        socket.on('send_message',(data)=> {
            const message = {sender:name,message:data}
            socket.to(room).emit('received_message',message)
        })
    })

    socket.on('join_one_to_one',(data)=> {
        console.log(data)

        // socket.join(data.sender_room);
        // socket.join(data.reciever_room);
        // const sr = data.sender_room;
        // const rr = data.reciever_room;
        // const name = data.name;
        const room_id = data.room_id
        const username = data.username
        const s = data.s
        const r = data.r
        // console.log(name,sr,rr)
        // socket.join([sr,rr])
        socket.join([room_id,username])
        socket.on('send_message_one_to_one',async (data)=> {
            console.log(data)
            // const message = {sender:name,message:data}
            const message = {sent_by:username,message:data.message}
            if('media' in data) {
                const extension = data.extension
                try {
                    let reqpath = await uploadImage(data.filename,data.media)
                    console.log("asyn await",reqpath)
                    const media_id= await saveMedia(data.filename,reqpath)
                    console.log(media_id)
                    message['media_ids'] = media_id
                }
                catch(err) {
                    console.log(err)
                }
            }
            const message_id = await saveMessageToRoom(room_id,message)
            console.log('messageID',message_id)
            if("reply_message_id" in data) {
                await replyToMessage(data.reply_message_id,message_id)
            }
            console.log("message go in ",room_id)
            message.message_id = message_id
            socket.to(room_id).emit('received_message_one_to_one',message)
            io.to(username).emit('response',message)
        })

        socket.on('add-reaction',async(data)=> {
            console.log(data)
            await addReactionToMessage(data.messageId,data.reaction)
            socket.to(room_id).emit('received-reaction',data)
        })

        socket.on('leaveRoom',()=> {
            console.log("leaving room",room_id)
            // socket.leave(room_id)
            socket.disconnect()
        })
    })
    

})

function uploadImage(filename,media) {
    return new Promise((resolve,reject)=> {
        let reqpath = path.resolve(__dirname, './uploads/' + new Date().getMilliseconds()+filename)
                var writer = fs.createWriteStream(reqpath, {
                    encoding: 'base64'
                    });
                    
                    
                    writer.write(media);
                    writer.end();
                    writer.on('finish',()=>{
                        console.log('finish')
                        console.log(reqpath)
                        resolve(reqpath)
                    })
                    writer.on('error',(err)=> reject(err))
    })
}

server.listen(4000,()=>console.log("Server running on 4000"))