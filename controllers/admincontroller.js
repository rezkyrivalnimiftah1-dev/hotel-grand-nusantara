const db = require('../config/db');

// ==========================
// 1. CREATE (POST) - Tambah Admin
// ==========================
const createAdmin = (req, res) => {
  // PERHATIKAN: id_user TIDAK diambil dari req.body karena sudah AUTO_INCREMENT
  // ROLE = UNTUK SUPER ADMIN  
  const { username, password, email, role } = req.body;

  // Validasi input (email & role opsional, boleh kosong)
  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Username dan password wajib diisi' });
  }

  // Cek apakah username sudah terdaftar
  const checkSql = 'SELECT * FROM admin WHERE username = ?';
  db.query(checkSql, [username], (err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    
    if (results.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Username sudah digunakan' });
    }

    // Insert data baru (Sekarang menyertakan kolom role)
    const insertSql = 'INSERT INTO admin (username, password, email, role) VALUES (?, ?, ?, ?)';
    
    // Jika email tidak diisi, ubah menjadi null
    const emailValue = email ? email : null;
    // Jika role tidak dikirim dari Thunder Client, otomatis jadikan 'admin'
    const roleValue = role ? role : 'admin'; 

    db.query(insertSql, [username, password, emailValue, roleValue], (err, result) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      
      // result.insertId otomatis mengambil ID yang baru saja dibuat database
      res.status(201).json({
        status: 'success',
        message: 'Admin berhasil ditambahkan',
        data: { 
          id_user: result.insertId, 
          username, 
          email: emailValue,
          role: roleValue
        }
      });
    });
  });
};

// ==========================
// 2. READ ALL (GET)
// ==========================
const getAllAdmin = (req, res) => {
  // Tambahkan 'role' pada query SELECT agar muncul di response
  const sql = 'SELECT id_user, username, email, role FROM admin';
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', total: results.length, data: results });
  });
};

// ==========================
// 3. UPDATE (PUT)
// ==========================
const updateAdmin = (req, res) => {
  const { id } = req.params; // id_user didapat dari URL
  const { username, password, email, role } = req.body; 

  if (!username) {
    return res.status(400).json({ status: 'error', message: 'Username wajib diisi' });
  }

  let sql = '';
  let values = [];

  // Cek apakah password baru dikirim
  const hasPassword = password && password.trim() !== "";
  // Cek apakah role dikirim, jika tidak pakai 'admin'
  const roleValue = role ? role : 'admin';
  const emailValue = email ? email : null;

  if (hasPassword) {
    // Update semuanya termasuk password dan role
    sql = 'UPDATE admin SET username = ?, password = ?, email = ?, role = ? WHERE id_user = ?';
    values = [username, password, emailValue, roleValue, id];
  } else {
    // Update tanpa mengubah password, tapi tetap update role
    sql = 'UPDATE admin SET username = ?, email = ?, role = ? WHERE id_user = ?';
    values = [username, emailValue, roleValue, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ status: 'error', message: 'Admin tidak ditemukan' });
    
    res.status(200).json({ status: 'success', message: 'Data admin berhasil diupdate' });
  });
};

// ==========================
// 4. DELETE (DELETE)
// ==========================
const deleteAdmin = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM admin WHERE id_user = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ status: 'error', message: 'Admin tidak ditemukan' });
    
    res.status(200).json({ status: 'success', message: 'Admin berhasil dihapus' });
  });
};

module.exports = {
  createAdmin,
  getAllAdmin,
  updateAdmin,
  deleteAdmin
};