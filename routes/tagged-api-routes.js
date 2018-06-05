var model = require('../models/memes.js');

module.exports = function (app){

    app.get("/api/tagged", function(req, res){
        var query = {};
        if (req.query.tagged_id){
            query.tagged_id = req.query.tagged_id;
        }
        model.Tagged.selectAll({
            where: query,
            include: [model.Memes]
        }).then(function(modelTagged){
            res.json(modelTagged)
        });
    });


    app.get("/api/tagged/:tag", function(req, res){
        model.Tagged.findTagged({
            where: {
                tagged_id: req.params.tagged_id
            },
            include: [model.Memes]
        }).then(function(modelTagged){
            res.json(modelTagged)
        });
    });


    app.post("/api/tagged", function(req, res) {
        model.Tagged.insertOne(req.body).then(function(modelTagged) {
          res.json(modelTagged);
        });
      });
}