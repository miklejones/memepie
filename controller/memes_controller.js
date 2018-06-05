const express = require("express");
const path = require("path");
const memes = require("../models/memes.js");

const router = express.Router();


router.get('../public/views/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

router.get('../public/views/upload.html', (req, res) =>{
    res.sendFile(path.join(__dirname, "upload.html"));
})


router.post("/api/memes", (req, res) => {
    console.log(req.body);
        memes.create([
        "file_path"
    ], [
        req.body.file_path
    ], result => {
        res.json({ meme_id: result.insertId })
    });
});

module.exports = router;