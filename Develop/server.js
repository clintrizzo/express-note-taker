const express = require("express");
const path = require("path");
const fs = require("fs");

const notes = express();
const PORT = 9005;
const mainDirectory = path.join(__dirname, "/public");