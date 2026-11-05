// const pool = require('../config/db');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const jwtSecret = process.env.JWT_SECRET;
// if (!jwtSecret) throw new Error('JWT_SECRET belum diset di .env');

// const salt_rounds = 10;

// module.exports = {
//   // POST /api/auth/register
//   register: async (req, res, next) => {
//     try {
//       // Sesuaikan dengan nama kolom di tabel phpMyAdmin 
//       const { nama, email, password, role, create_at } = req.body;
      
//       if (!email || !password) {
//         return res.status(400).json({ message: 'email & password wajib' });
//       }
//       if (password.length < 6) {
//         return res.status(400).json({ message: 'password minimal 6 karakter' });
//       }

//       // Cek apakah user sudah ada (Gunakan tabel 'user')
//       const [existing] = await pool.promise().execute('SELECT * FROM user WHERE email = ?', [email]);
//       if (existing.length > 0) {
//         return res.status(400).json({ message: 'Email sudah terdaftar' });
//       }

//       // Hash password
//       const hashed = await bcrypt.hash(password, salt_rounds);
      
      
//       // Insert ke table 'user' (Sesuaikan nama kolom: nama, role, create_at)
//       const [result] = await pool.execute(
//         'INSERT INTO user (nama, email, password, role, create_at) VALUES (?, ?, ?, ?, ?)',
//         [nama, email, hashed, role || 'user', create_at || new Date()]
//       );

//       const insertedId = result.insertId;
//       return res.status(201).json({ id_user: insertedId, email, nama });

//     } catch (err) {
//       next(err);
//     }
//   },
  
//   // POST /api/auth/login
//   login: async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
        
//         if (!email || !password) {
//           return res.status(400).json({ message: 'email dan password wajib' });
//         }

//         // Ambil data user (Gunakan tabel 'user')
//         const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
//         if (rows.length === 0) {
//           return res.status(401).json({ message: 'invalid credential' });
//         }

//         const user = rows[0];

//         // Bandingkan password
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//           return res.status(401).json({ message: 'invalid credential' });
//         }

//         // Generate JWT (Sesuaikan id_user)
//         const payload = { id: user.id_user, email: user.email, role: user.role };
//         const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

//         return res.json({
//             message: 'login berhasil',
//             token,
//             user: { id_user: user.id_user, email: user.email, nama: user.nama, role: user.role } 
//         });
//     } catch (err) {
//         next(err);
//     }
//   }
// };
// ==========================
// CODE BARU

const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET belum diset di .env');

const salt_rounds = 10;

module.exports = {
  // POST /api/auth/register
  register: async (req, res, next) => {
    try {
      // Hanya ambil nama, email, dan password dari frontend
      const { nama, email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'email & password wajib' });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: 'password minimal 6 karakter' });
      }

      // Cek apakah user sudah ada
      const [existing] = await pool.promise().execute('SELECT * FROM user WHERE email = ?', [email]); // DI TAMBAHKAN PROMISE DI SINI 
      if (existing.length > 0) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }

      // Hash password
      const hashed = await bcrypt.hash(password, salt_rounds);
      
      // TETAPKAN ROLE SECARA OTOMATIS SEBAGAI 'customer' SESUAI ENUM DATABASE
      const role = 'customer';
      
      // Insert ke table 'user'
      const result = await pool.promise().execute(
        'INSERT INTO user (nama, email, password, role, create_at) VALUES (?, ?, ?, ?, ?)',
        [nama, email, hashed, role, new Date()] // Menggunakan new Date() untuk create_at
      );

      const insertedId = result.insertId;
      return res.status(201).json({ id_user: insertedId, email, nama, role });

    } catch (err) {
      next(err);
    }
  },
  
  // POST /api/auth/login
  login: async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
          return res.status(400).json({ message: 'email dan password wajib' });
        }

        // Ambil data user
        const [rows] = await pool.promise().execute('SELECT * FROM user WHERE email = ?', [email]); // TAMBAHKAN PROMISE DI SINI
        if (rows.length === 0) {
          return res.status(401).json({ message: 'email ini belum terdaftar' });
        }

        const user = rows[0];

        // Bandingkan password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).json({ message: 'password salah' });
        }

        // Generate JWT 
        const payload = { id: user.id_user, email: user.email, role: user.role };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

        return res.json({
            message: 'login berhasil',
            token,
            user: { id_user: user.id_user, email: user.email, nama: user.nama, role: user.role } 
        });
    } catch (err) {
        next(err);
    }
  }
};