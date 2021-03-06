const orm = require('../config/orm');

const memes = {
    all: cb => {
        orm.selectAll('memes', res => {
            cb(res);
        });
    },
    create: (cols, vals, cb) => {
        orm.insertOne('memes', cols, vals, res => {
            cb(res);
        });
    },

    //not sure that this serves a purpose
    findByTag: (tag_id, cb) => {
        orm.findTagged(tag_id, res => {
            cb(res);
        })
    }
}

module.exports = memes;