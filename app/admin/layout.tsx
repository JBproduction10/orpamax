

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <main className="flex-grow flex flex-col">
        {children}
      </main>
    </div>
  );
}