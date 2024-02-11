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

router.delete("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = "DELETE FROM datapendaftar WHERE id = ?";
    db.query(sql, userId, (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('User deleted successfully');
        }
    });
});

router.post("/move-to-lulus/:userId", (req, res) => {
    const userId = req.params.userId;
    const moveToLulusSql = "INSERT INTO dataditerima SELECT * FROM datapendaftar WHERE id = ?";
    const deleteFromPendaftarSql = "DELETE FROM datapendaftar WHERE id = ?";
    
    db.query(moveToLulusSql, userId, (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Hapus baris pengguna dari tabel pendaftar setelah dipindahkan
            db.query(deleteFromPendaftarSql, userId, (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error:', deleteErr);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).send('User moved to "diterima" table successfully');
                }
            });
        }
    });
});

module.exports = router;

