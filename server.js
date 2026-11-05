// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors'); // Aktifkan ini nanti jika Anda sudah membuat Frontend (React/Vue/dll)

// 1. Panggil routes Anda
const authRoutes = require('./routes/authroutes'); // INI ADALAAH ROUTES USER
const reservasiRoutes = require('./routes/reservasiroutes');
const kamarRoutes =require('./routes/kamarroutes'); //
const pembayaranRoutes = require('./routes/pembayaranroutes');
const adminRoutes = require('./routes/adminroutes'); // INI ADALAAH ROUTES ADMIN
const laporanRoutes = require('./routes/laporanroutes'); // INI ADALAAH ROUTES LAPORAN
const tipe_kamarRoutes = require('./routes/tipe_kamarroutes'); // INI ADALAAH ROUTES TIPE KAMAR
const tamuRoutes = require('./routes/tamuroutes');
// (Hapus atau komentari categoryRoutes & movieRoutes karena tidak dipakai di hotel)

// 2. Middleware global
app.use(cors()); // Aktifkan ini nanti jika Anda sudah membuat Frontend (React/Vue/dll)
app.use(express.json()); // Supaya server bisa membaca data JSON dari Postman
// app.use(cors()); // Aktifkan ini nanti jika Anda sudah membuat Frontend (React/Vue/dll)

// 3. Daftarkan Routes ke Endpoint
// Jadi setiap request ke /api/auth/register akan ditangani oleh authRoutes
app.use('/api/auth', authRoutes); 
app.use('/api/reservasi', reservasiRoutes); 
app.use('/api/kamar', kamarRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/admin',adminRoutes); // INI ADALAH ROUTES ADMIN
app.use('/api/laporan', laporanRoutes); // INI ADALAAH ROUTES LAPORAN
app.use('/api/tipe_kamar', tipe_kamarRoutes);
app.use('/api/tamu', tamuRoutes);
// 4. Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// 5. Jalankan Server (DI PALING BAWAH)
const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', () => { // tambahan 0000
    console.log(`Server berjalan pada port ${PORT}`);
});