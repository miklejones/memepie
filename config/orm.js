const connection = require("../config/connection.js");

const printQuestionMarks = num => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?")
    };
    return arr.toString();
};

const objToSql = ob => {
    let arr = [];
    for (let key in ob) {
        let value = ob[key];
        if (object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
        return arr.toString();
    }
};

const orm = {
    selectAll: (tableInput, cb) => {
        const queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
        console.log(queryString);
    },
    insertOne: function (table, cols, vals, cb) {
        console.log(`cols to string: ${cols.toString()}`);
        console.log(`vals length: ${vals.length}`);
        const queryString =
            `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;
        console.log(queryString);
        console.log(`insertOne was just used with table:${table} cols:${cols} vals:${vals}`);
        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },


    insertTwo: function (table, cols1, cols2, vals1, vals2, cb) {
        console.log(`cols to string: ${cols.toString()}`);
        console.log(`vals length: ${vals.length}`);
        const queryString =
            `INSERT INTO ${table} (${cols1.toString()}, ${cols2.toString()}) VALUES (${printQuestionMarks(vals1.length)}, ${printQuestionMarks(vals2.length)})`;
        console.log(queryString);
        console.log(`insertTwo was just used with table:${table} cols:${cols} vals:${vals}`);
        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },





    findTagged: (tag_id, cb) => {
        console.log(`tag_id: ${tag_id}`);
        const queryString =
            `SELECT  memes.file_path, tagged.tag_id FROM memes INNER JOIN tagged ON memes.file_path=tagged.file_path WHERE tag_id = "${tag_id}"`
        console.log(queryString);
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }
};

//  Export the orm object for the model
module.exports = orm;