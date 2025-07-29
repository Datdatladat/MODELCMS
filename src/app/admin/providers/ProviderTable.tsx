'use client';

import { Pencil, Trash2 } from 'lucide-react';

interface Provider {
  id: string,
  name: string,
  apiKey: string,
  baseUrl: string
}

interface ProviderTableProps {
  providers: Provider[];
  onEditClick: (provider: Provider) => void;
}

export default function ProviderTable({ providers, onEditClick }: ProviderTableProps) {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Danh sách Providers</h2>
      <table className="min-w-full w-full table-fixed border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 text-black font-semibold border-b">Name</th>
            <th className="px-6 py-3 text-black font-semibold border-b">Api Key</th>
            <th className="px-6 py-3 text-black font-semibold border-b">Base Url</th>
            <th className="px-6 py-3 text-black font-semibold border-b">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {providers.length > 0 ? (
            providers.map((provider, index) => (
              <tr key={provider.id} className="border-t">
                <td className="px-6 py-3 text-black">{provider.name}</td>
                <td className="px-6 py-3 text-black">{provider.apiKey}</td>
                <td className="px-6 py-3 text-black">{provider.baseUrl}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button
                    onClick={() => onEditClick(provider)}
                    className="hover:bg-gray-200 p-2 rounded"
                  >
                    <Pencil className="w-5 h-5 text-black" />
                  </button>
                  <button className="hover:bg-gray-200 p-2 rounded">
                    <Trash2 className="w-5 h-5 text-black" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-6">
                Chưa có provider nào được thêm.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
