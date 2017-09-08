document.querySelector("#submit").addEventListener("click", sendRequest);
document.querySelector("#input").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        sendRequest();
    }
});

function sendRequest() {
  var u = document.querySelector("#user").value;
  var s = document.querySelector("#startdate").value;
  var e = document.querySelector("#enddate").value;
  
  if (u.length < 1 || s.length < 5 || e.length < 5) return;
  
  var url ="https://vine-kitty.glitch.me/count-tweets?user=" + u + "&start=" + s + "&end=" + e;
  
  // console.log(url);
  
  httpGetAsync(url, x => {
    x = JSON.parse(x);
    console.log("Data received: " + JSON.stringify(x));
    var display = document.querySelectorAll("[id^=display-]");
    
    for (var d = 0; d < display.length; d++) {
      display[d].innerHTML = x[display[d].id.split("-")[1]];
    }
    
  });
  
}

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      console.log("executing callback with data: " + xmlHttp.responseText);
      callback(xmlHttp.responseText);
    }
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}