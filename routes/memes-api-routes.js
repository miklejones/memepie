const model = require("../models/memes.js");

module.exports = function (app) {
    app.get("/api/memes", function(req, res){
        model.Memes.selectAll({
            include: [model.Tagged]
        }).then(function(modelMemes){
            res.json(modelMemes);
        });
    });

    app.get("/api/memes/:tag", function(req,res){
        model.Memes.findTagged({
            where: {
                tag_id: req.params.tag_id
            },
            include: [model.Tagged]
        }).then(function(modelMemes){
            res.json(modelMemes);
        });
    });

    app.post("/api/memes", function(req, res) {
        model.Memes.create(req.body).then(function(modelMemes) {
          res.json(modelMemes);
        });
      });
}