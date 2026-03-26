import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export async function sendPasswordResetEmail(to, resetLink) {
  return await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente botón para restablecer tu contraseña.</p>
      <a href="${resetLink}" style="display:inline-block;padding:12px 20px;background:#d00;color:#fff;text-decoration:none;border-radius:6px;">
        Restablecer contraseña
      </a>
      <p>Este enlace expira en 1 hora.</p>
    `
  });
}