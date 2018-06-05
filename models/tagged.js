const orm = require('../config/orm');

const tagged = {
    all: cb => {
        orm.selectAll('tagged', res => {
            cb(res);
        });
    },
    create: (cols1, cols2, vals1, vals2, cb) => {
        orm.insertTwo('tagged', cols1, cols2, vals1, vals2, res => {
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

module.exports = tagged;