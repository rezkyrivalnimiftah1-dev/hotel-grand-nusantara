const db = require('../config/db');

// Laporan: Total pendapatan & jumlah transaksi berdasarkan rentang tanggal
const getLaporanPembayaran = (req, res) => {
  // Ambil query parameter dari URL (misal: ?start=2023-10-01&end=2023-10-31)
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ status: 'error', message: 'Parameter start dan end wajib diisi' });
  }

  // Query untuk menghitung Total dan Jumlah transaksi (agregasi)
  // Pastikan status_verifikasi = 'Diterima' (atau sesuai kebutuhan Anda)
  const sql = `
    SELECT 
      COUNT(id_pembayaran) AS total_transaksi,
      SUM(jumlah_bayar) AS total_pendapatan
    FROM pembayaran
    WHERE tanggal_bayar BETWEEN ? AND ?
    AND status_verifikasi = 'Diterima'
  `;

  db.query(sql, [start, end], (err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    
    // Kirim data yang sudah diolah ke frontend
    res.status(200).json({
      status: 'success',
      periode: { dari: start, sampai: end },
      data: results[0] // Hasil SUM dan COUNT ada di index 0
    });
  });
};

module.exports = { getLaporanPembayaran };