
// controllers/kamarcontroller.js
const pool = require('../config/db'); // Sesuaikan path jika perlu

// Fungsi Create (POST)
const createKamar = async (req, res) => {
    // 1. Ambil data dari body
    const { id_hotel, id_tipe_kamar, nomor_kamar, status } = req.body;

    // Validasi sederhana
    if (!id_hotel || !id_tipe_kamar || !nomor_kamar) {
        return res.status(400).json({
            message: "Data tidak lengkap. id_hotel, id_tipe_kamar, dan nomor_kamar wajib diisi."
        });
    }

    try {
        // 2. Query Insert
        const query = `
            INSERT INTO kamar 
            (id_hotel, id_tipe_kamar, nomor_kamar, status) 
            VALUES (?, ?, ?, ?)
        `;

        // Jika status tidak dikirim, default ke 'tersedia'
        const values = [
            id_hotel,
            id_tipe_kamar,
            nomor_kamar,
            status || 'tersedia' 
        ];

        // 3. Eksekusi
        const [result] = await pool.query(query, values);

        // 4. Response sukses
        res.status(201).json({
            message: "Kamar berhasil ditambahkan",
            data: {
                id_kamar: result.insertId,
                ...req.body
            }
        });

    } catch (error) {
        console.error("Error creating kamar:", error);
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
};

module.exports = {
    createKamar
};