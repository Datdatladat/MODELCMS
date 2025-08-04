// src/app/user/loading.tsx
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mb-6 animate-spin" />
      <div className="text-2xl font-bold text-gray-500 mb-2">Đang tải trang...</div>
      <div className="text-lg text-gray-400">Vui lòng chờ trong giây lát</div>
    </div>
  );
}
