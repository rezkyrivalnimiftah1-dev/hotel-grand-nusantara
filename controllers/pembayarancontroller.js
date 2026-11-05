const db = require('../config/db'); // Sesuaikan path import db Anda

// ==========================
// 1. CREATE (POST)
// ==========================
const createPembayaran = (req, res) => {
  const { id_reservasi, metode, jumlah_bayar, tanggal_bayar, status_verifikasi } = req.body;

  // Validasi input
  if (!id_reservasi || !metode || !jumlah_bayar || !tanggal_bayar || !status_verifikasi) {
    return res.status(400).json({ status: 'error', message: 'Semua field wajib diisi' });
  }

  const sql = `INSERT INTO pembayaran 
    (id_reservasi, metode, jumlah_bayar, tanggal_bayar, status_verifikasi) 
    VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [id_reservasi, metode, jumlah_bayar, tanggal_bayar, status_verifikasi], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.status(201).json({
      status: 'success',
      message: 'Pembayaran berhasil ditambahkan',
      data: { id_pembayaran: result.insertId, ...req.body }
    });
  });
};

// ==========================
// 2. READ ALL (GET)
// ==========================
const getAllPembayaran = (req, res) => {
  const sql = 'SELECT * FROM pembayaran';
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.status(200).json({
      status: 'success',
      total_data: results.length,
      data: results
    });
  });
};

// ==========================
// 3. READ BY ID (GET)
// ==========================
const getPembayaranById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM pembayaran WHERE id_pembayaran = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Data pembayaran tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', data: results[0] });
  });
};

// ==========================
// 4. UPDATE (PUT)
// ==========================
const updatePembayaran = (req, res) => {
  const { id } = req.params;
  const { id_reservasi, metode, jumlah_bayar, tanggal_bayar, status_verifikasi } = req.body;

  const sql = `UPDATE pembayaran SET 
    id_reservasi = ?, metode = ?, jumlah_bayar = ?, tanggal_bayar = ?, status_verifikasi = ? 
    WHERE id_pembayaran = ?`;

  db.query(sql, [id_reservasi, metode, jumlah_bayar, tanggal_bayar, status_verifikasi, id], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data pembayaran tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', message: 'Pembayaran berhasil diupdate' });
  });
};

// ==========================
// 5. DELETE (DELETE)
// ==========================
const deletePembayaran = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM pembayaran WHERE id_pembayaran = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'Data pembayaran tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', message: 'Pembayaran berhasil dihapus' });
  });
};

// Export semua fungsi agar bisa dipakai di routes
module.exports = {
  createPembayaran,
  getAllPembayaran,
  getPembayaranById,
  updatePembayaran,
  deletePembayaran
};