import { Provider } from '@/types/providers';

export interface Model {
  id: string;
  modelCode: string;
  displayName: string;
  enabled: boolean;
  provider: Provider;
}

export interface ModelCreateRequest {
  modelCode: string;
  displayName: string;
  provider_id: string;
}

export interface ModelUpdateInfoRequest {
  displayName: string;
  modelCode: string;
  providerId: string;
}

export interface ModelResponse {
  success: boolean;
  message: string;
  data: Model[];
  timestamp: string;
  statusCode: number;
  metadata: {
    size: number;
    last: boolean;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
    page: number;
    first: boolean;
    totalElements: number;
  };
}