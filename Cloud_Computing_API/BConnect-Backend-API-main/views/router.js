const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { encryptPassword, checkPassword } = require('../utils/auth');


const prisma = new PrismaClient();

// Rute untuk pendaftaran pengguna (POST /views/router/register)
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Periksa apakah email sudah digunakan
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            // Gagal, email sudah digunakan
            return res.status(400).json({ error: 'Email sudah digunakan' });
        } else {
            // Enkripsi kata sandi
            const hashedPassword = await encryptPassword(password);

            // Buat pengguna baru
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });

            // Sukses, respons JSON
            return res.status(200).json({ status: 'success', message: 'Pengguna berhasil terdaftar', user: newUser });
        }
    } catch (error) {
        console.error(error);
        // Gagal mendaftarkan pengguna, respons JSON
        return res.status(500).json({ status: 'error', message: 'Gagal mendaftarkan pengguna' });
    }
});

// Rute untuk login (POST /views/router/login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari pengguna berdasarkan email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Gagal, pengguna tidak ditemukan
            return res.status(400).json({ error: 'Pengguna tidak ditemukan' });
        } else {
            // Periksa apakah kata sandi cocok
            const passwordMatch = await checkPassword(password, user.password);

            if (!passwordMatch) {
                // Gagal, kata sandi salah
                return res.status(401).json({ error: 'Kata sandi salah' });
            } else {
                // Sukses, respons JSON
                return res.status(200).json({ status: 'success', message: 'Login berhasil', user: { id: user.id, email: user.email, name: user.name } });
            }
        }
    } catch (error) {
        console.error(error);
        // Gagal login, respons JSON
        return res.status(500).json({ status: 'error', message: 'Gagal login' });
    }
});




module.exports = router;
