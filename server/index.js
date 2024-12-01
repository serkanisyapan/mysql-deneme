import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "malzeme_kartlari",
});

// post sorgusu gondermeye izin verir
app.use(express.json());

// serverin client tarafindan kullanilmasina olanak saglar
app.use(cors());

// tum malzeme kartlarini getirir
app.get("/malzeme-kartlari", (req, res) => {
    // tum malzeme kartlarini getirmek icin sql query
    const malzemeKartlariniGetir = "SELECT * from malzemekartlari";
    db.query(malzemeKartlariniGetir, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// yeni bir malzeme karti yaratir
app.post("/malzeme-kartlari", (req, res) => {
   const { MalzemeAdi, KAFKodu, ArtikelKodu, YabanciAdi, Birim } = req.body;

   // yeni bir malzeme karti eklemek icin sql query
   const yeniMalzemeKartiEkle = "INSERT INTO malzemekartlari (`MalzemeAdi`, `KAFKodu`, `ArtikelKodu`, `YabanciAdi`, `Birim`) VALUES (?)"; 

   const malzemeKartiDegerleri = [MalzemeAdi, KAFKodu, ArtikelKodu, YabanciAdi, Birim];

   db.query(yeniMalzemeKartiEkle, [malzemeKartiDegerleri], (err, data) => {
    if (err) return res.json(err);
    return res.json("Malzeme listesine yeni malzeme eklenmistir.")
   });
});

// database'e baglanir
db.connect((err) => {
    if (err) {
        console.error('error connecting to the mysql server', err.message);
        return;
    }
    console.log('connected to mysql server');
});

// express server'i dinlemeye baslar
app.listen(8000, () => {
    console.log("connected");
});