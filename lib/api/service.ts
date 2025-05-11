const baseUrl = '/api/admin/cleaning/services';

export const createService = async (data: {
  title: string;
  description: string;
  iconName: string;
  imageUrl: {
    secure_url: string;
    public_id: string;
  };
}) => {
  // rename iconName to icon before sending to API
  const { iconName, ...rest } = data;

  return await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({ ...rest, icon: iconName }), // ✅ use `icon`
    headers: { 'Content-Type': 'application/json' },
  });
};


export const getServiceById = async (id: string) => {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch service');
  return await res.json();
};

export const updateService = async (
  id: string,
  data: { title: string; description: string; imageUrl: string; iconName: string }
) => {
  return await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteService = async (id: string) => {
  return await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
};

export const getAllServices = async () => {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error('Failed to fetch services');
  return await res.json();
};
