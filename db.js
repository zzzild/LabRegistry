const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    database:"appPendaftaran",
    user : "root",
    password: "", 
})

db.connect((err) => {
    if(err) throw err;
    console.log('Database connected');
})

module.exports = db;