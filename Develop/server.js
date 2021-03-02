const express = require("express");
const path = require("path");
const fs = require("fs");
const e = require("express");

const notes = express();
const PORT = process.env.PORT || 9005
const mainDirectory = path.join(__dirname, "/public");

notes.use(express.static("public"));
//from activities folder
notes.use(express.urlencoded({ extended: true }));
notes.use(express.json());

notes.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDirectory, "notes.html"));
});

notes.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

notes.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

notes.get("*", function(req, res) {
    res.sendFile(path.join(mainDirectory, "notes.html"));
});

//posting notes to the left column
notes.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //https://www.geeksforgeeks.org/express-js-req-body-property/
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note was saved", newNote);
    res.json(savedNotes);
})

//deleting current saved notes
//https://www.youtube.com/watch?v=L72fhGm1tfE (minute 55)
notes.delete('./db/db.json', (req, res) => {
    const found = notes.some(newNote.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: "Note deleted",
            notes: notes.filter(newNote.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No note with that id ${req.params.id}` });
    }
});

//console logging for the return if no errors to tell user the port is active
notes.listen(PORT, function() {
    console.log(`App is listening on PORT ${PORT}`)
})