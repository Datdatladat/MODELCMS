'use client';

import { useState } from 'react';
import Header from './Header';
import AddProviderButton from './AddProviderButton';
import ProviderTable from './ProviderTable';

export default function Page() {
  const [providers, setProviders] = useState<
    { code: string; name: string; status: 'active' | 'inactive' }[]
  >([]);

  const handleAddProvider = (provider: {
    code: string;
    name: string;
    status: 'active' | 'inactive';
  }) => {
    setProviders((prev) => [...prev, provider]);
  };

  return (
    <div className="p-6 space-y-6">
      <Header />
      <AddProviderButton onAdd={handleAddProvider} />
      <ProviderTable providers={providers} />
    </div>
  );
}
