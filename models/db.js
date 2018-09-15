const sqlite3 = require('sqlite3').verbose();
const dbName = './database.db';
const db = new sqlite3.Database(dbName);

class Artworks {
    static all(cb) {
        db.all('SELECT * FROM artwork LIMIT 10 OFFSET 200', cb);
    }

    static find(id, cb) {
        db.get('SELECT * FROM artwork WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        const sql = 'INSERT INTO artwork() VALUES (?, ?)';
        db.run(sql, data.name, data.content, cb);
    }

    static delete(id, cb) {
        if (!id) return cb(new Error('Please provide an id'));
        db.run('DELETE FROM artwork WHERE id = ?', id, cb);
    }
}

class Artists {
    static all(cb) {
        db.all('SELECT * FROM artists', cb);
    }

    static find(id, cb) {
        db.get('SELECT * FROM artists WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        const sql = 'INSERT INTO artists() VALUES (?, ?)';
        db.run(sql, data.name, data.content, cb);
    }

    static delete(id, cb) {
        if (!id) return cb(new Error('Please provide an id'));
        db.run('DELETE FROM artists WHERE id = ?', id, cb);
    }
}

module.exports = db;
module.exports.Artworks = Artworks;
module.exports.Artists = Artists;