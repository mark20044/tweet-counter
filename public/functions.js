document.querySelector("#submit").addEventListener("click", function() {
  var u = document.querySelector("#user").value;
  var s = document.querySelector("#startdate").value;
  var e = document.querySelector("#enddate").value;
  
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
  
});

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