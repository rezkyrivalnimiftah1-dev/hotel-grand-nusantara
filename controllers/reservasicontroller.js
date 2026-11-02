// controllers/categoryController.js
const pool = require('../config/db');

// Fungsi untuk membuat reservasi baru (POST)
const createReservasi = async (req, res) => {
    // 1. Ambil data dari body request
    const {
        id_tamu,
        id_kamar,
        tanggal_check_in,
        tanggal_check_out,
        total_biaya,
        status_reservasi
    } = req.body;

    // Validasi sederhana: pastikan field wajib tidak kosong
    if (!id_tamu || !id_kamar || !tanggal_check_in || !tanggal_check_out) {
        return res.status(400).json({
            message: "Data tidak lengkap. Pastikan id_tamu, id_kamar, dan tanggal terisi."
        });
    }

    try {
        // 2. Query SQL untuk Insert
        // Kita tidak perlu memasukkan 'id_reservasi' karena biasanya AUTO_INCREMENT
        // Kita juga tidak perlu memasukkan 'status_reservasi' karena default-nya sudah 'pending' di database
        const query = `
            INSERT INTO reservasi 
            (id_tamu, id_kamar, tanggal_check_in, tanggal_check_out, total_biaya,status_reservasi) 
            VALUES (?, ?, ?, ?, ?,? )
        `;

        const values = [
            id_tamu,
            id_kamar,
            tanggal_check_in,
            tanggal_check_out,
            total_biaya || 0 ,
            status_reservasi || "pending"
        ];

        // 3. Eksekusi query
        const [result] = await pool.query(query, values);

        // 4. Kirim response sukses
        res.status(201).json({
            message: "Reservasi berhasil dibuat",
            data: {
                id_reservasi: result.insertId, // ID yang baru saja dibuat
                ...req.body
            }
        });

    } catch (error) {
        console.error("Error creating reservasi:", error);
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
};

// Export function agar bisa dipakai di routes
module.exports = {
    createReservasi,
    // ... function lain seperti getAllReservasi, dll
};