var model = require('../models/tagged.js');

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
        console.log('wowowowowowo');
        console.log(req.body);
        
        
        model.Tagged.create(req.body).then(function(modelTagged) {
          res.json(modelTagged);
        });
      });
}