var socket = io();
var submit = $("#submit");

//When a user connects to the server, this will display them the current posts
socket.on("showPosts", (data) => {
  $('#header-title').css("color", randomColor());
  for(var i in data) {
    var title = '<h3>'+data[i].title+' [post no.'+data[i].postNum+']</h3>',
        message = '<p>'+data[i].message+'</p>';
    $(".postcontainer").append("<div class=\"post\">" + title + message + "</div><hr />");
  }
});

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

function randomColor() {
  var n = Math.random() * 355;
  return "hsl("+n+", 100%, 50%)";
}
