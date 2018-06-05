const orm = require('../config/orm');

const Memes = {
    all: cb => {
        orm.selectAll('memes', res => {
            cb(res);
        });
    },
    create: (table, cols, vals, cb) => {
        orm.insertOne(table, cols, vals, res => {
            cb(res);
        });
    },
    findByTag: (tag_id, cb) => {
        orm.findTagged(tag_id, res => {
            cb(res);
        })
    }
}

module.exports = Memes;