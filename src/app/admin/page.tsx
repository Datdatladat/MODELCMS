'use client';

export default function AdminDashboard() {
  const providerCount = 2; // dữ liệu giả
  const modelCount = 3; // dữ liệu giả

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1 text-black">Dashboard Admin</h1>
      <p className="text-gray-600 mb-6">Chào mừng admin đến với hệ thống quản lý</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Providers */}
        <div className="bg-white rounded border p-6">
          <h2 className="text-xl font-semibold text-black">Providers</h2>
          <p className="text-gray-600 text-sm mb-4">Quản lý các nhà cung cấp API</p>
          <div className="text-3xl font-bold text-black">{providerCount}</div>
          <p className="text-gray-500 text-sm">Tổng số providers</p>
        </div>

        {/* Card Models */}
        <div className="bg-white rounded border p-6">
          <h2 className="text-xl font-semibold text-black">Models</h2>
          <p className="text-gray-600 text-sm mb-4">Quản lý các model AI</p>
          <div className="text-3xl font-bold text-black">{modelCount}</div>
          <p className="text-gray-500 text-sm">Tổng số models</p>
        </div>
      </div>
    </div>
  );
}
