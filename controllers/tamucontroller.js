// controllers/tamuController.js
const db = require('../config/db');

module.exports = {
    // GET /api/tamu (Melihat semua data tamu)
    getAll: (req, res, next) => {
        const sql = 'SELECT * FROM tamu ORDER BY id_tamu DESC';
        
        db.query(sql, (err, rows) => {
            if (err) return next(err);
            res.json(rows);
        });
    },

    // GET /api/tamu/:id
    getById: (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const sql = 'SELECT * FROM tamu WHERE id_tamu = ?';
        
        db.query(sql, [id], (err, rows) => {
            if (err) return next(err);
            if (rows.length === 0) return res.status(404).json({ message: 'Tamu tidak ditemukan' });
            res.json(rows[0]);
        });
    },

    // POST /api/tamu (protected)
    create: (req, res, next) => {
        const { nama_lengkap, no_identitas, email, no_hp } = req.body;
        
        if (!nama_lengkap || !no_identitas) {
            return res.status(400).json({ 
                message: 'Nama lengkap dan No identitas wajib di isi' 
            });
        }

        const sql = `INSERT INTO tamu (nama_lengkap, no_identitas, email, no_hp) VALUES (?, ?, ?, ?)`;
        const values = [nama_lengkap, no_identitas, email || null, no_hp];

        db.query(sql, values, (err, result) => {
            if (err) return next(err);

            res.status(201).json({
                message: 'Data tamu berhasil ditambahkan',
                data: {
                    id_tamu: result.insertId,
                    nama_lengkap,
                    no_identitas,
                    email,
                    no_hp   
                }
            });
        });
    },

    // PUT /api/tamu/:id (protected)
    update: (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const { nama_lengkap, no_identitas, email, no_hp } = req.body;

        // Build dynamic update
        const fields = [];
        const values = [];
        if (nama_lengkap !== undefined) { fields.push('nama_lengkap = ?'); values.push(nama_lengkap); }
        if (no_identitas !== undefined) { fields.push('no_identitas = ?'); values.push(no_identitas); }
        if (email !== undefined) { fields.push('email = ?'); values.push(email); }
        if (no_hp !== undefined) { fields.push('no_hp = ?'); values.push(no_hp); }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'Tidak ada data yang di ubah' });
        }

        values.push(id);
        const sql = `UPDATE tamu SET ${fields.join(', ')} WHERE id_tamu = ?`;

        db.query(sql, values, (err, result) => {
            if (err) return next(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tamu tidak ditemukan' });
            
            res.json({ message: 'Data tamu berhasil diperbarui' });
        });
    },

    // DELETE /api/tamu/:id (protected)
    remove: (req, res, next) => {
        const id = parseInt(req.params.id, 10);
        const sql = 'DELETE FROM tamu WHERE id_tamu = ?';

        db.query(sql, [id], (err, result) => {
            if (err) return next(err);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tamu tidak ditemukan' });
            
            res.json({ message: 'Data tamu berhasil dihapus' });
        });
    }
};