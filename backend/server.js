const http = require('http');
const {Server} = require('socket.io');


require("dotenv").config();
const express = require('express');
const canvasRouter =require("./routers/canvasRouter") 
const cors = require('cors');
const ConectaToDatabase = require("./config/db")
const userRouter = require('./routers/userRouter');
const { Socket } = require('dgram');
const app = express();

app.use(cors())
ConectaToDatabase();

app.use(express.json());

app.use("/users",userRouter);
app.use("/canvas",canvasRouter);

const port = process.env.PORT
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});
io.on('connection',(socket)=>
{
    console.log('a user conected',socket.id);
    socket.on('disconect',()=>
        {
            console.log('User disconnected:', socket.id);
        });
})
app.listen(port,()=>console.log(' Websoket Server is listening on port 8000.'));
