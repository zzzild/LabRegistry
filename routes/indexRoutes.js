const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/index", (req,res) => {
    const sql ="SELECT * FROM datapendaftar";
    db.query(sql, (err,result) => {
        const users = JSON.parse(JSON.stringify(result))
        
        res.render("index", {users: users, title: "Pendaftar"})
    })
})

module.exports = router;

// fitur

