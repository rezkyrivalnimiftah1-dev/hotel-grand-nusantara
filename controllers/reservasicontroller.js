
const pool = require('../config/db'); 

// --- ENDPOINT 1: POST /api/reservasi ---
const createReservasi = async (req, res) => {
    const {
        id_tamu,
        id_kamar,
        tanggal_check_in,
        tanggal_check_out,
        total_biaya,
        status_reservasi
    } = req.body;

    // Validasi wajib isi
    if (!id_tamu || !id_kamar || !tanggal_check_in || !tanggal_check_out) {
        return res.status(400).json({
            message: "Data tidak lengkap. Pastikan id_tamu, id_kamar, tanggal_check_in, dan tanggal_check_out terisi."
        });
    }

    try {
        // Query Insert (Pastikan 6 kolom = 6 tanda tanya)
        const query = `
            INSERT INTO reservasi 
            (id_tamu, id_kamar, tanggal_check_in, tanggal_check_out, total_biaya, status_reservasi) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [
            id_tamu,
            id_kamar,
            tanggal_check_in,
            tanggal_check_out,
            total_biaya || 0,
            status_reservasi || 'pending'
        ];

        const [result] = await pool.query(query, values);

        res.status(201).json({
            message: "Reservasi berhasil dibuat",
            data: {
                id_reservasi: result.insertId,
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

// --- ENDPOINT 2: GET /api/reservasi/user/:userId ---
const getReservasiByUser = async (req, res) => {
    // Ambil userId dari parameter URL
    const { userId } = req.params;

    try {
        // Query untuk mengambil semua reservasi milik user tertentu
        // Kita juga bisa JOIN dengan tabel kamar jika ingin menampilkan detail kamar
        const query = `
            SELECT * FROM reservasi 
            WHERE id_tamu = ?
            ORDER BY tanggal_check_in DESC
        `;

        const [rows] = await pool.query(query, [userId]);

        // Jika data kosong, tetap kirim status 200 dengan array kosong
        res.status(200).json({
            message: `Daftar reservasi untuk user ID ${userId}`,
            total_data: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Error fetching reservasi by user:", error);
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
};

// Export kedua function
module.exports = {
    createReservasi,
    getReservasiByUser
};