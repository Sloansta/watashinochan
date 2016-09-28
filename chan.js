const express = require("express");
const app = express();
const mong = require("mongoose");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require('path');

var gpn = 0; //Stands for global post number


mong.connect("mongodb://localhost:27017");
var db = mong.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Opened connection!");
});

//This the basic text based post schema. There will be one that includes images in later builds!
var postSchema = mong.Schema({
    title: String,
    message: String,
    postNum: Number
});

var post = mong.model('post', postSchema);

app.use(express.static(__dirname + '/front-end'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/front-end/index.html");
});

io.on("connection", (socket) => {
    console.log("Connected to the server");

    displayPosts(socket);

    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });

    //When the user requests to post something, this will be called!
    //This function essentially saves the post to the database, and then in return will display the post
    socket.on("requestPost", (data) => {
        var pst = new post({ title: data.title, message: data.message, postNum: gpn });
        pst.save((err, pst) => {
            if (err) return console.error(err);

            console.log("Saved post: " + gpn);
            gpn += 1;
        });
    });
});

function displayPosts(sock) {
    post.find((err, posts) => {
        if (err) return console.error(err);
        sock.emit("showPosts", posts);
    });
}

http.listen(3001, () => {
    console.log("Listening on 3001");
});


//Closes
process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
    // Clear the DB
    post.remove({}, (err) => {
        if (err) return console.error(err);
    });
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
