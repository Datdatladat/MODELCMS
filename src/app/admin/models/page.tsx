'use client';

import { Model } from '@/types/models';
import { useState, useEffect } from 'react';
import { getModels } from '@/service/model';
import Header from './Header';
import CreateModelModal from './CreateModelModal';
import ModelTable from './ModelTable';
import EditModelModal from './EditModelModal';

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingModel, setEditingModel] = useState<Model | null>(null);

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    const fetchModels = async () => {
      setLoading(true);

      const response = await getModels();
      console.log(response);
      setModels(response.data);
      setLoading(false);
    };

    fetchModels();
  }, []);

  const handleAddModel = (newModel) => {
    setModels((prev) => [...prev, newModel]);
  };

  const handelSave = (updatedModel: Model) => {
    setModels(prev =>
      prev.map(m => (m.id === updatedModel.id ? updatedModel : m))
    );
  }

  const handleToggleStatus = (id: string, newStatus: boolean) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === id ? { ...model, enabled: newStatus } : model
      )
    );
  };


  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <Header />
        <CreateModelModal onAdd={handleAddModel} />
      </div>

      <ModelTable
        models={models}
        onEditClick={(model) => setEditingModel(model)}
        onToggleStatus={handleToggleStatus}
      />
      {editingModel && (
        <EditModelModal
          model={editingModel}
          onClose={() => setEditingModel(null)}
          onSave={handelSave}
        />
      )}
    </div>
  );
}
