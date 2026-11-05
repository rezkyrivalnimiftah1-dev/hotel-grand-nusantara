// controllers/tipe_kamarcontroller.js
const db = require('../config/db'); // Menggunakan koneksi callback biasa

module.exports = {
    // GET /api/tipe-kamar
    getAll: (req, res, next) => {
        const sql = `SELECT * FROM tipe_kamar ORDER BY id_tipe_kamar DESC`;
        
        db.query(sql, (err, rows) => {
            if (err) return next(err); // Lempar error ke middleware
            res.json(rows);
        });
    },

    // GET /api/tipe-kamar/:id
    getById: (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const sql = `SELECT * FROM tipe_kamar WHERE id_tipe_kamar = ?`;
        
        db.query(sql, [id], (err, rows) => {
            if (err) return next(err);
            if (rows.length === 0) return res.status(404).json({ message: 'Tipe kamar tidak ditemukan' });
            res.json(rows[0]);
        });
    },

    // POST /api/tipe-kamar (protected)
    create: (req, res, next) => {
        const { nama_tipe, harga, kapasitas } = req.body;

        if (!nama_tipe) {
            return res.status(400).json({ message: 'Nama tipe wajib diisi' });
        }

        const sql = `INSERT INTO tipe_kamar (nama_tipe, harga, kapasitas) VALUES (?, ?, ?)`;
        const values = [nama_tipe, harga || 0, kapasitas || 0];

        db.query(sql, values, (err, result) => {
            if (err) return next(err);
            
            res.status(201).json({
                id_tipe_kamar: result.insertId,
                nama_tipe,
                harga,
                kapasitas
            });
        });
    },

    // PUT /api/tipe-kamar/:id (protected)
    update: (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const { nama_tipe, harga, kapasitas } = req.body;

        const fields = [];
        const values = [];
        if (nama_tipe !== undefined) { fields.push('nama_tipe = ?'); values.push(nama_tipe); }
        if (harga !== undefined)     { fields.push('harga = ?');     values.push(harga); }
        if (kapasitas !== undefined) { fields.push('kapasitas = ?'); values.push(kapasitas); }

        if (fields.length === 0) return res.status(400).json({ message: 'Tidak ada data yang diubah' });

        values.push(id);
        const sql = `UPDATE tipe_kamar SET ${fields.join(', ')} WHERE id_tipe_kamar = ?`;
        
        db.query(sql, values, (err, result) => {
            if (err) return next(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tipe kamar tidak ditemukan' });
            
            res.json({ message: 'Tipe kamar berhasil diperbarui' });
        });
    },

    // DELETE /api/tipe-kamar/:id (protected)
    remove: (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const sql = `DELETE FROM tipe_kamar WHERE id_tipe_kamar = ?`;
        
        db.query(sql, [id], (err, result) => {
            if (err) return next(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tipe kamar tidak ditemukan' });
            
            res.json({ message: 'Tipe kamar berhasil dihapus' });
        });
    }
};