import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, url: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  })

  await transporter.sendMail({
    from: `"Orpamax" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}
