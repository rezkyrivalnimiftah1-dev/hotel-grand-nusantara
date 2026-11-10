// controllers/reservasiController.js
const pool = require('../config/db');

//post crud
const createReservasi = (req, res) => {
    const {
        id_tamu,
        id_kamar,
        tanggal_check_in,
        tanggal_check_out,
        total_biaya,
        metode,
        status_verifikasi,
        status_reservasi
    } = req.body;

    if (!id_tamu || !id_kamar || !tanggal_check_in || !tanggal_check_out) {
        return res.status(400).json({
            message: "Data tidak lengkap. Pastikan id_tamu, id_kamar, tanggal_check_in, dan tanggal_check_out terisi."
        });
    }

    // 1. Query Insert ke tabel reservasi
    const queryReservasi = `
        INSERT INTO reservasi 
        (id_tamu, id_kamar, tanggal_check_in, tanggal_check_out, total_biaya, status_reservasi) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const valuesReservasi = [
        id_tamu,
        id_kamar,
        tanggal_check_in,
        tanggal_check_out,
        total_biaya || 0,
        status_reservasi || 'pending'
    ];

    pool.query(queryReservasi, valuesReservasi, (err, resultReservasi) => {
        if (err) {
            console.error("Error creating reservasi:", err);
            return res.status(500).json({
                message: "Terjadi kesalahan pada server saat membuat reservasi",
                error: err.message
            });
        }

        // Ambil ID reservasi yang baru dibuat
        const newReservasiId = resultReservasi.insertId;

        // 2. Query Insert otomatis ke tabel pembayaran menggunakan callback bersarang
        const queryPembayaran = `
            INSERT INTO pembayaran 
            (id_reservasi, metode, status_verifikasi, jumlah_bayar, tanggal_bayar) 
            VALUES (?, ?, ?, ?, ?)
        `;

        // LOGIKA TANGGAL BAYAR:
        // Jika cash, gunakan tanggal_check_in (ditambah jam default 10:00:00).
        // Jika transfer/qris, gunakan waktu server saat ini (new Date()).
        const tanggalPembayaran = (metode === 'cash') 
            ? `${tanggal_check_in} 10:00:00` 
            : new Date();

        const valuesPembayaran = [
            newReservasiId,
            metode || 'transfer',
            status_verifikasi || 'pending',
            total_biaya || 0,
            tanggalPembayaran // <-- Ini yang sebelumnya hilang min
        ];

        pool.query(queryPembayaran, valuesPembayaran, (errPembayaran, resultPembayaran) => {
            if (errPembayaran) {
                console.error("Error creating pembayaran:", errPembayaran);
                return res.status(500).json({
                    message: "Reservasi berhasil dibuat, tetapi gagal mencatat pembayaran",
                    error: errPembayaran.message
                });
            }

            // Berhasil simpan ke tabel reservasi DAN tabel pembayaran
            res.status(201).json({
                message: "Reservasi dan pembayaran berhasil dibuat",
                data: {
                    id_reservasi: newReservasiId,
                    id_pembayaran: resultPembayaran.insertId,
                    ...req.body
                }
            });
        });
    });
};

// --- ENDPOINT 2: GET /api/reservasi/user/:userId ---
const getReservasiByUser = (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT * FROM reservasi 
        WHERE id_tamu = ?
    `;

    pool.query(query, [userId], (err, rows) => {
        if (err) {
            console.error("Error fetching reservasi by user:", err);
            return res.status(500).json({
                message: "Terjadi kesalahan pada server",
                error: err.message
            });
        }

        res.status(200).json({
            message: `Daftar reservasi untuk user ID ${userId}`,
            total_data: rows.length,
            data: rows
        });
    });
};

// --- ENDPOINT 3: GET /api/reservasi ---
const getAllReservasi = (req, res) => {
    const query = `SELECT * FROM reservasi ORDER BY tanggal_check_in DESC`;

    pool.query(query, (err, rows) => {
        if (err) {
            console.error("Error fetching all reservasi:", err);
            return res.status(500).json({
                message: "Terjadi kesalahan pada server",
                error: err.message
            });
        }

        res.status(200).json({
            message: "Daftar semua reservasi",
            total_data: rows.length,
            data: rows
        });
    });
};

// --- ENDPOINT 4: PUT /api/reservasi/:id ---
const updateReservasi = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID reservasi tidak valid" });
    }

    const {
        id_tamu,
        id_kamar,
        tanggal_check_in,
        tanggal_check_out,
        total_biaya,
        status_reservasi
    } = req.body;

    const fields = [];
    const values = [];

    if (id_tamu !== undefined) { fields.push('id_tamu = ?'); values.push(id_tamu); }
    if (id_kamar !== undefined) { fields.push('id_kamar = ?'); values.push(id_kamar); }
    if (tanggal_check_in !== undefined) { fields.push('tanggal_check_in = ?'); values.push(tanggal_check_in); }
    if (tanggal_check_out !== undefined) { fields.push('tanggal_check_out = ?'); values.push(tanggal_check_out); }
    if (total_biaya !== undefined) { fields.push('total_biaya = ?'); values.push(total_biaya); }
    if (status_reservasi !== undefined) { fields.push('status_reservasi = ?'); values.push(status_reservasi); }

    if (fields.length === 0) {
        return res.status(400).json({ message: 'Tidak ada data yang di ubah' });
    }

    values.push(id);
    const query = `UPDATE reservasi SET ${fields.join(', ')} WHERE id_reservasi = ?`;

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error("Error updating reservasi:", err);
            return res.status(500).json({
                message: "Terjadi kesalahan pada server",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
        }

        res.status(200).json({
            message: 'Reservasi berhasil diperbarui',
            id_reservasi: id
        });
    });
};

// --- ENDPOINT 5: DELETE /api/reservasi/:id ---
const deleteReservasi = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID reservasi tidak valid" });
    }

    const query = 'DELETE FROM reservasi WHERE id_reservasi = ?';

    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting reservasi:", err);
            return res.status(500).json({
                message: "Terjadi kesalahan pada server",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
        }

        res.status(200).json({ message: 'Reservasi berhasil dihapus' });
    });
};

module.exports = {
    createReservasi,
    getReservasiByUser,
    getAllReservasi,
    updateReservasi,
    deleteReservasi
};
