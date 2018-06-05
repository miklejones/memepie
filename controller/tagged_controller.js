const express = require("express");
const path = require("path");
const tagged = require("../models/tagged.js");

const router = express.Router();


router.get('../public/views/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

router.get('../public/views/upload.html', (req, res) =>{
    res.sendFile(path.join(__dirname, "upload.html"));
})


router.post("/api/tagged", (req, res) => {
    console.log(req.body);
        model.tagged.create([
        "file_path", "tags_id"
    ], [
        req.body.file_path, req.body.tags_id
    ], result => {
        res.json({ meme_id: result.insertId })
    });
});

module.exports = router;