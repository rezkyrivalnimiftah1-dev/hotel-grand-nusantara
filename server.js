// server.js
require('dotenv').config();
const express = require('express');
const app = express();

// 1. Panggil routes Anda
const authRoutes = require('./routes/authroutes'); 
  const reservasiRoutes = require('./routes/reservasiroutes');
  const kamarRoutes =require('./routes/kamarroutes'); //
// (Hapus atau komentari categoryRoutes & movieRoutes karena tidak dipakai di hotel)

// 2. Middleware global
app.use(express.json()); // Supaya server bisa membaca data JSON dari Postman
// app.use(cors()); // Aktifkan ini nanti jika Anda sudah membuat Frontend (React/Vue/dll)

// 3. Daftarkan Routes ke Endpoint
// Jadi setiap request ke /api/auth/register akan ditangani oleh authRoutes
app.use('/api/auth', authRoutes); 
app.use('/api/reservasi', reservasiRoutes); 
app.use('/api/kamar', kamarRoutes);
// 4. Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// 5. Jalankan Server (DI PALING BAWAH)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});