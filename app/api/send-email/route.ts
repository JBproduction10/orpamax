import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file') as File | null;

  const entries = Object.fromEntries(formData.entries());

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const serviceType = entries.serviceType as string;
  const serviceLabel = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);

  const htmlTemplate = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">
    <h2 style="text-align: center; color: #333;">📩 New ${serviceLabel} Quote Request</h2>
    
    <p style="color: #555; font-size: 14px;">You’ve received a new quote request through the website. Below are the submitted details:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tbody>
        ${Object.entries(entries).map(([key, value]) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff; font-weight: 600; text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}</td>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #ffffff;">${value}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
      This message was generated automatically from your website.
    </p>
  </div>
`;


  const mailOptions: any = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New ${serviceLabel} Quote Request`,
    html: htmlTemplate,
  };

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    mailOptions.attachments = [
      {
        filename: file.name,
        content: buffer,
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
