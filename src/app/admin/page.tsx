// src/app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { FiDatabase, FiSettings } from 'react-icons/fi';

export default function AdminDashboard() {
  const providerCount = 2; // dữ liệu giả
  const modelCount = 3; // dữ liệu giả

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
        <p className="text-xl text-gray-600">Chào mừng admin đến với hệ thống quản lý</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Providers */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
              <FiDatabase className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Providers</h2>
              <p className="text-gray-500">Quản lý các nhà cung cấp API</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-2">{providerCount}</div>
          <p className="text-gray-500">Tổng số providers</p>
        </div>

        {/* Card Models */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
              <FiSettings className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Models</h2>
              <p className="text-gray-500">Quản lý các model AI</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-2">{modelCount}</div>
          <p className="text-gray-500">Tổng số models</p>
        </div>
      </div>
    </div>
  );
}