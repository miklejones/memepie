const express = require("express");
const path = require("path");
const Memes = require("../models/memes.js");
const router = express.Router();


router.get('../public/views/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

router.get('../public/views/upload.html', (req, res) =>{
    res.sendFile(path.join(__dirname, "upload.html"));
})


router.post("/api/memes", (req, res) => {
    console.log(req.body);
    
    Memes.create([
        "memes", "file_path"
    ], [
        req.body.name, req.body.file_path
    ], result => {
        res.json({
            meme_id: result.insertId
        })
    });
    // Memes.create([
    //     "tagged", "tag_id",
    // ], [
    //     req.body.tags_id
    // ], result => {
    //     res.json({
    //         meme_id: result.insertId
    //     })
    // });
});

module.exports = router;