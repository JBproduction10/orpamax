import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { connectToDatabase } from '@/lib/database/mongodb';

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE_MB = 5;

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    return NextResponse.json({ error: 'File too large. Max size is 5MB.' }, { status: 413 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinaryV2.uploader.upload_stream(
        {
          resource_type: 'image',
          transformation: [
            { width: 1920, height: 1080, crop: 'fill', gravity: 'auto' }, // Full HD and fill the area
            { quality: 'auto', fetch_format: 'auto' } // Optimize image quality and format
          ],
        },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
