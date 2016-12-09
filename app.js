var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static("website"));

app.get("/", function(req, res){
  res.send("index.html");
});

app.listen(PORT, function(){
  console.log("YAY! Listeningg on " + PORT);
});
