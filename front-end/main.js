var socket = io();
var submit = $("#submit");

//When a user connects to the server, this will display them the current posts
socket.on("showPosts", (data) => {
  $('#header-title').css("color", randomColor());
  for(var i in data) {
<<<<<<< HEAD
    var title = '<h3>'+data[i].title+' [post no.'+data[i].postNum+']</h3>',
        message = '<p>'+data[i].message+'</p>';
    $(".postcontainer").append("<div class=\"post\">" + title + message + "</div><hr />");
=======
    var title = '<div id="'+data[i].postNum+'"><h2>'+data[i].title+' [post no.'+data[i].postNum+']</h2><button id="b_'+data[i].postNum+'" onclick="postComment('+data[i].postNum+')">Reply</button> </div>',
        message = '<h4>'+data[i].message+'</h2>';
    $("body").append(title, message);
>>>>>>> origin/master
  }
});

//Submits a post to the database.
function submitPost() {
  var title = $("#title").val(),
      message = $("#message").val();

  if(title != null && title != "" && message != null && message != "") {
    socket.emit("requestPost", {
      title: title,
      message: message
    });
  }else
    alert("Boxes cannot be empty and or null!!!!");
}

//Posts a comment to the database!
function postComment(id) {
  var cmt = prompt("Comment something related to the post here:");
  socket.emit("postComment", {id: id, comment: cmt});
}

//Expands the comments within a givin element, will get this working once we have comments themselves working!
function expandComments(id) {
  socket.emit("expandComments", id)
}

function randomColor() {
  var n = Math.random() * 355;
  return "hsl("+n+", 100%, 50%)";
}
