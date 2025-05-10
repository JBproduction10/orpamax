// /app/api/send-booking-request/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const formData = await request.json();

  const { selectedDate, selectedTime, selectedService, message } = formData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const serviceLabel = selectedService.charAt(0).toUpperCase() + selectedService.slice(1);

  const htmlTemplate = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #333;">📩 New ${serviceLabel} Booking Request</h2>
      
      <p style="color: #555; font-size: 14px;">You’ve received a new booking request through the website. Below are the submitted details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff; font-weight: 600;">Date</td>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff;">${selectedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff; font-weight: 600;">Time</td>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff;">${selectedTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff; font-weight: 600;">Service Type</td>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff;">${serviceLabel}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff; font-weight: 600;">Special Instructions</td>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff;">${message}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
        This message was generated automatically from your website.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `${serviceLabel} Booking Request`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' });
  }
}
