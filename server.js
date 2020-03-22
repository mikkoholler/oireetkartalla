"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var favicon = require("express-favicon");
var app = express();
var port = process.env.PORT || 5000;
app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.listen(port, function () {
    console.log("Listening on port " + port);
});
app.get("/ping", function (req, res) {
    return res.send("pong");
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});
