const express = require("express");
const path = require("path");
const fs = require("fs");

const notes = express();
const port = 9005;
const mainDirectory = path.join(__dirname, "/public");