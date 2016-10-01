var socket = io();
var submit = $("#submit");

//When a user connects to the server, this will display them the current posts
socket.on("showPosts", (data) => {
    $('#header-title').css("color", randomColor());
    for (var i in data) {
        var title = '<div id="' + data[i].postNum + '"><h3 class="inline">' + data[i].title + ' [post no.' + data[i].postNum + ']</h3><button type="submit" id="b_' + data[i].postNum + '" onclick="postComment(' + data[i].postNum + ')" class="inline button-comment">Reply</button> </div>',
            message = '<div class="message"><p>' + data[i].message + '</p></div>';
        $(".postcontainer").append("<div class=\"post\">" + title + message + "</div><hr/>");

        if (data[i].comments.length > 0) {
            console.log("here");
            for (var j in data[i].comments) {
                var num = '<h3>Comment no.' + j + '</h3>',
                    comment = '<p>' + data[i].comments[j] + '</p>';
                $(".post").append("<div class=\"comment\">" + num + comment + "</div>");
            }
        }
    }
});

//Event listener for when the user wants to upload an image and or file
$("#fileinput").on('change', () => {
  //Next commit this will handle the image uploading and sending the data to the server to be saved!!!!
});

//Submits a post to the database.
function submitPost() {
    var title = $("#title").val(),
        message = $("#message").val();

    if (title != null && title != "" && message != null && message != "") {
        socket.emit("requestPost", {
            title: title,
            message: message
        });
    } else
        alert("Boxes cannot be empty and or null!!!!");
}

//Posts a comment to the database!
function postComment(id) {
    var cmt = prompt("Comment something related to the post here:");
    socket.emit("postComment", { id: id, comment: cmt });
}

//Expands the comments within a givin element, will get this working once we have comments themselves working!
function expandComments(id) {
    socket.emit("expandComments", id)
}

function randomColor() {
    var n = Math.random() * 355;
    return "hsl(" + n + ", 100%, 50%)";
}
