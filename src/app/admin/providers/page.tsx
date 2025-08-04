'use client';

import { useState } from 'react';
import Header from './Header';
import AddProviderButton from './AddProviderButton';
import ProviderTable from './ProviderTable';
//import { getProviders } from '@/service/provider';
import { useEffect } from 'react';
import EditProviderModal from './UpdateProviderModal';
import { Provider } from '@/types/providers';

export default function Page() {
  const [providers, setProviders] = useState([]);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);


  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res.data.content);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  const handleAddProvider = (newProvider) => {
    setProviders((prev) => [...prev, newProvider]);
  };

  const handleSave = (updatedProvider: Provider) => {
    setProviders(prev =>
      prev.map(p => (p.id === updatedProvider.id ? updatedProvider : p))
    );
  };

   return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <Header />
        <AddProviderButton onAdd={handleAddProvider} />
      </div>
      
      <ProviderTable
        providers={providers}
        onEditClick={(provider) => setEditingProvider(provider)}
      />
      
      {editingProvider && (
        <EditProviderModal
          provider={editingProvider}
          onClose={() => setEditingProvider(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
