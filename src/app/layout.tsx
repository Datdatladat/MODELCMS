
import '@/styles/globals.css';
import type { Metadata } from 'next';
import ClientOnly from '@/components/ClientOnly';

export const metadata: Metadata = {
  title: 'TinaSoft ModelCMS',
  description: 'Trang quản trị hệ thống AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 text-black">
        <ClientOnly fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        }>
          {children}
        </ClientOnly>
      </body>
    </html>
  );
}
