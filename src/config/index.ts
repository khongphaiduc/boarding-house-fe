import devConfig from './development.json';
import prodConfig from './production.json';

export interface AppConfig {
  env: 'development' | 'production' | 'test';
  appName: string;
  version: string;
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  features: {
    enableMockData: boolean;
    enableDebugLogs: boolean;
    enableNotifications: boolean;
    autoRefreshInterval: number;
  };
  appSettings: {
    defaultTheme: string;
    defaultPageSize: number;
    currency: string;
  };
}

const isProduction = import.meta.env.MODE === 'production' || import.meta.env.PROD;
const baseRawConfig = isProduction ? (prodConfig as AppConfig) : (devConfig as AppConfig);

// Combine JSON config with potential Vite env overrides
export const config: AppConfig = {
  ...baseRawConfig,
  env: isProduction ? 'production' : 'development',
  api: {
    ...baseRawConfig.api,
    // Cho phép override bằng VITE_API_BASE_URL từ file .env nếu có
    baseUrl: import.meta.env.VITE_API_BASE_URL || baseRawConfig.api.baseUrl,
  },
};

export const isDev = config.env === 'development';
export const isProd = config.env === 'production';

export default config;
