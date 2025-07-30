
import '@/styles/globals.css';
import type { Metadata } from 'next';

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
      <body className="bg-gray-50 text-black">{children}</body>
    </html>
  );
}
