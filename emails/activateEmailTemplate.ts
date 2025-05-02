export const activateEmailTemplate = (name: string, url: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Activate Your Account</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 0;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo img {
      height: 50px;
    }
    h1 {
      color: #333;
    }
    p {
      color: #666;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      margin-top: 40px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="/orpamax/fulllogo_transparent.png" alt="Orpamax Logo" />
    </div>
    <h1>Hello ${name},</h1>
    <p>Thank you for registering with <strong>Orpamax Services</strong>!</p>
    <p>Please click the button below to activate your account:</p>
    <a href="${url}" class="button">Activate Account</a>
    <p>If you did not register, please ignore this email.</p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Orpamax. All rights reserved.
    </div>
  </div>
</body>
</html>
`
