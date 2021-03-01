const express = require("express");
const path = require("path");
const fs = require("fs");

const notes = express();
const PORT = 9005;
const mainDirectory = path.join(__dirname, "/public");

notes.use(express.static("public"));
notes.use(express.urlencoded({ extended: true }));
notes.use(express.json());

notes.get("/notes", function(reg, res) {
    res.sendFile(path.join(mainDirectory, "notes.html"));
});

notes.listen(PORT, function() {
    console.log(`App is listening on ${PORT}`)
})