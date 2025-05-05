import { BusinessInfoProvider } from '@/contexts/contact/BusinessInfoContext'
import Sidebar from '@/components/admin/AdminSidebar';
import Header from '@/components/admin/AdminHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}