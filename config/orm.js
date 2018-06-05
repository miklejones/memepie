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

var orm = {
    selectAll: (tableInput, cb) => {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
        console.log(queryString);
    },
    findTagged: (tag_id, cb) => {
        let queryString = "SELECT memes.file_path, tagged.tag_id";
        queryString += " FROM memes";
        queryString += " INNER JOIN tagged";
        queryString += " ON memes.file_path";
        queryString += " = tagged.file_path";
        queryString += " WHERE tag_id";
        queryString += "= " + ('?');

        console.log(queryString);

        connection.query(queryString, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
            // findTagged() => {
            //     const query = connection.query("SELECT * FROM memes WHERE meme_id=?", [""], (err, res) =>{
            //         for (var i=0; i < res.length; i++) {
            //             console.log(res[i].memes.meme_id + " | " + res[i].tagged.meme_id);
            //         }
            //     });
            // };
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString =
        `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;
        console.log(queryString);
        console.log('anything');
        
        // var queryString2 =
        // 'INSERT INTO ?? (file_path) VALUES (?)'
        connection.query(queryString, vals, (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    }
};

//  Export the orm object for the model
module.exports = orm;