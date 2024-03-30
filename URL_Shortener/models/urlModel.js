const pool = require("../config/db");

module.exports = {
    checkEntry: async (redirectURL) => {
        return pool
            .promise()
            .query("SELECT * FROM `URL_Shortener_DB` WHERE redirectURL = ?", [
                redirectURL,
            ])
            .then(([rows, fields]) => {
                console.log("log from model", rows);
                return rows;
            })
            .catch((err) => console.log("hello", err));
    },
    createEntry: async (data) => {
        return pool
            .promise()
            .query("INSERT INTO `URL_Shortener_DB` SET ?", data)
            .then(([rows, fields]) => {
                console.log("log from model", rows);
                return rows;
            })
            .catch((err) => console.log("hello", err));
    },
    getStats: async (shortID) => {
        return pool
            .promise()
            .query("SELECT * FROM `URL_Shortener_DB` WHERE shortID = ? ", [
                shortID,
            ])
            .then((rows, fields) => {
                console.log("log from model", rows);
                return rows;
            })
            .catch((err) => console.log("hello", err));
    },
    getEntry: async (shortID) => {
        return pool
            .promise()
            .query(
                "UPDATE `URL_Shortener_DB` SET `clicks`= `clicks`+1 WHERE shortID = ?",
                [shortID]
            )
            .then(([rows, fields]) => {
                return pool
                    .promise()
                    .query(
                        "SELECT * FROM `URL_Shortener_DB` WHERE shortID = ? ",
                        [shortID]
                    )
                    .then((rows, fields) => {
                        console.log("log from model", rows);
                        return rows[0];
                    });
            })
            .catch((err) => console.log("hello", err));
    },
};
