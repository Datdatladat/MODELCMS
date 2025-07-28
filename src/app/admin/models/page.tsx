'use client';

import { Pencil, Trash } from 'lucide-react';

export default function ModelsPage() {
  const models = [
    {
      code: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      status: 'active',
    },
    {
      code: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      status: 'active',
    },
    {
      code: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      status: 'inactive',
    },
  ];

  return (
    <div>
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Quản lý Models</h1>
          <p className="text-gray-600">Quản lý các model AI</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          + Thêm Model
        </button>
      </div>

      {/* Bảng danh sách models */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Danh sách Models</h2>
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 text-black">Model Code</th>
              <th className="px-4 py-2 text-black">Display Name</th>
              <th className="px-4 py-2 text-black">Provider</th>
              <th className="px-4 py-2 text-black">Trạng thái</th>
              <th className="px-4 py-2 text-black">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-black">{model.code}</td>
                <td className="px-4 py-2 font-medium text-black">{model.name}</td>
                <td className="px-4 py-2 text-black">{model.provider}</td>
                <td className="px-4 py-2 text-black">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      model.status === 'active'
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {model.status === 'active' ? 'Kích hoạt' : 'Tắt'}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="p-2 rounded text-black">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 rounded text-black">
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
