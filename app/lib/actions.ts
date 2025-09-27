'use server';

import { pool } from '@/app/lib/db';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import { randomUUID } from 'crypto';
import { redirect } from 'next/navigation';

async function sendEmail(token: string, email: email) {
  const html = `
    <h4>Yth. ${email}</h4>
    <p>Selamat Anda telah terdaftar di SAC 2025.</p>
    <p>Berikut QR code yang dapat digunakan pada saat registrasi pada saat Event SAC 2025</p>
    <p>Terima kasih, kami tunggu kehadiran Anda di SAC 2025</p>
  `;

  // start email here
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // true for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const qrBuffer = await QRCode.toBuffer(token, { width: 300 });
  await transporter.sendMail({
    from: `"SDGs Registration" <${process.env.EMAIL_USER}>`,
    to: `${email}`,
    subject: 'Registrasi SAC 2025',
    html,
    attachments: [
      {
        filename: 'ticket-qr.png',
        content: qrBuffer,
        cid: 'ticket-qr' // matches the cid in the HTML
      }
    ]
  });
}

export async function createUserReg(
  prevState: StateUser,
  formData: FormData
): Promise<StateUser> {
  const email = String(formData.get('email') || '').trim();
  const nama = String(formData.get('nama') || '').trim();
  const hariId = Number(formData.get('hari') || 0);
  const sesiId = Number(formData.get('sesi') || 0);
  const kedatangan = String(formData.get('kedatangan') || 'online');

  const token = randomUUID();
  const errors: Record<string, string> = {};

  // Basic validation
  if (!email || !email.includes('@')) {
    errors.email = 'Valid email required';
  }
  if (Object.keys(errors).length > 0) {
    return { message: null, errors };
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO users (email, nama, hari_id, sesi_id, kedatangan, token) VALUES (?, ?, ?, ?, ?, ?)`,
      [email, nama, hariId, sesiId, kedatangan, token]
    );

    try {
      //sendEmail(token, email);
    } catch (err: any) {
      console.error('Email send failed:', err);
      return { message: null, errors: { email: 'Email send failed' } };
    }
  } catch (err: any) {
    // Handle duplicate email or other DB errors
    if (err.code === 'ER_DUP_ENTRY') {
      return { message: null, errors: { email: 'Email already exists' } };
    }
    console.error('DB insert error:', err);
    return { message: null, errors: { general: 'Database error' } };
  }
  //
  redirect('/');
}
