
export async function uploadImage(file: File): Promise<{ secure_url: string; public_id: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/admin/upload/image', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Image upload failed');

  const data = await res.json();
  return { secure_url: data.secure_url, public_id: data.public_id };
}
