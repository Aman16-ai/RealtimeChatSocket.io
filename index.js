const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const routes = require("./src/routes/mainRoutes")
const db_url = process.env.MONGODB
const app = express();
const server = http.createServer(app)

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

app.post("/chat",(req,res)=> {
    return res.sendFile(__dirname+"/index.html")
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
        const sr = data.sender_room;
        const rr = data.reciever_room;
        const name = data.name;
        console.log(name,sr,rr)
        socket.join([sr,rr])
        socket.on('send_message_one_to_one',(data)=> {
            console.log(data)
            const message = {sender:name,message:data}
            socket.to(sr).to(rr).emit("received_message_one_to_one",message)
            // socket.to(data.sender_room).emit("received_message_one_to_one",message)
        })
    })


})

server.listen(4000,()=>console.log("Server running on 4000"))