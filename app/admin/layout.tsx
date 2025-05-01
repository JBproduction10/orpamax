import { BusinessInfoProvider } from '@/contexts/contact/BusinessInfoContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BusinessInfoProvider>
      <div className="flex flex-col pt-20 scroll-smooth">
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </div>
    </BusinessInfoProvider>
  );
}