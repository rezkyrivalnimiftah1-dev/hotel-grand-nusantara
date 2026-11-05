// // buat promise
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// //cek koneksi database
// const dburl = process.env.DATABASE_URL || '';
// if(!dburl){
//     throw new Error('database_url belum diset di .env');
    
// }

// const url  = new URL (dburl);

// //koneksi crud
// const pool =mysql.createPool ({
//     host : url.hostname,
//     user : url.username,
//     password : url.password,
//     database : url.pathname.replace(/^\//,''), // path tanpa leading slash => dbname
//     port : url.port ? Number(url.port) : 3306,
//     waitForConnections : true,
//     connectionLimit :10,
//     queueLimit :0
// });

// //export koneksi
// module.exports = pool;

// ======================= KODE BARU INI PAKAI CALLBACK. DI ATAS PAKAI ASYNC/AWAIT

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Pastikan password MySQL kamu benar (biasanya kosong di XAMPP)
    database: 'db_hotelgrandnusantara'
});

// INI PENTING: Tambahkan koneksi dan log
db.connect((err) => {
    if (err) {
        console.error('❌ Gagal konek ke database:', err.message);
        return;
    }
    console.log('✅ Berhasil konek ke database MySQL!');
});

module.exports = db;