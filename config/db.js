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
