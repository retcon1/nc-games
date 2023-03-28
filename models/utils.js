const db = require("../db/connection");

exports.checkEntityExists = (entity) => {
    return db.query(`
    SELECT * FROM $1 WHERE comment_id = $2
    `)
}