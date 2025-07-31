import { api } from '@/lib/api';

export interface Version {
  version: string;
  download_url: string;
  osTypeDetail: string;
}

export interface OSVersion {
  os: string;
  versions: Version[];
}

export interface VersionsResponse {
  success: boolean;
  message: string;
  data: OSVersion[];
  timestamp: string;
  statusCode: number;
}

export const getVersions = async (): Promise<VersionsResponse> => {
  try {
    const response = await api.get('/api/versions');
    return response.data;
  } catch (error) {
    console.error('Error fetching versions:', error);
    throw error;
  }
};
