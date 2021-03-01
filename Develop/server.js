const express = require("express");
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./routes/apiRoutes")

const notes = express();
const PORT = 9005;
const mainDirectory = path.join(__dirname, "/public");

notes.use(express.static("public"));
//from activities folder
notes.use(express.urlencoded({ extended: true }));
notes.use(express.json());

notes.get("/notes", function(reg, res) {
    res.sendFile(path.join(mainDirectory, "notes.html"));
});

notes.get("*", function(reg, res) {
    res.sendFile(path.join(mainDirectory, "index.html"));
});

//fetching api from JS file
notes.post("/api/notes", function(reg, res) {
    let savedNotes = JSON.parse(fs.readFile(".db/db.json"));
    let newNote = req.body;
    let UniqueID = (savedNotes.length).toString();
    newNote.id = UniqueID;
    savedNotes.push(newNote);
})

//console logging for the return if no errors to tell user the port is active
notes.listen(PORT, function() {
    console.log(`App is listening on PORT ${PORT}`)
})