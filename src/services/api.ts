/**
 * Base API client configuration
 * Can be replaced with Axios or extended for backend integration
 */

import { config } from '../config';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const BASE_URL = config.api.baseUrl;

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error(`Request to ${endpoint} failed:`, error);
    throw error;
  }
}
