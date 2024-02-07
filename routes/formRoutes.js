const express = require('express');
const db = require('../db');
const router = express.Router();


let lastUsedId = 0 ;

router.get('/form', (req,res) => {
    res.render('form', {title: 'Formulir pendaftaran'});
});

router.post("/tambah" , (req,res) => {
    const newId = lastUsedId + 1 ;
    const insertSql = `INSERT INTO datapendaftar (id, Npm, Nama, Kelas, Jurusan, Lokasi, TTL, JenisKelamin, Alamat, NoHandphone, Email, Posisi, IPK)
                        VALUES ('${newId}', '${req.body.npm}', '${req.body.nama}', '${req.body.kelas}', '${req.body.jurusan}', '${req.body.lokasi}', '${req.body.ttl}', '${req.body.gender}', '${req.body.alamat}', '${req.body.noHandphone}','${req.body.email}', '${req.body.posisi}', '${req.body.ipk}');`

                        
    db.query(insertSql, (err, result) => {
        if(err) throw err
        res.redirect("/form")
        lastUsedId = newId
    })
})

module.exports = router;