// lib/themeLoader.ts
import {connectToDatabase} from '@/lib/database/mongodb';
import Theme from '@/lib/database/models/Theme';

export async function getTheme() {
  await connectToDatabase();
  const theme = await Theme.findOne();
  return theme;
}
