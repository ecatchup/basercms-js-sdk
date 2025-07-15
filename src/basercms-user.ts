import { ApiClient } from './basercms-js-sdk';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.API_BASE_URL || 'https://localhost';
const apiClient = new ApiClient({ apiBaseUrl: BASE_URL });
import axiosBase from 'axios';

/**
 * ログインしてアクセストークンをセット
 */
const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const response = await axiosBase.post(
      `${apiClient['axiosInstance'].defaults.baseURL}/baser/api/admin/baser-core/users/login.json`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: apiClient['axiosInstance'].defaults.httpsAgent
      }
    );
    if (response.data && response.data.access_token) {
      // アクセストークンをApiClientのaxiosインスタンスにセット
      apiClient['axiosInstance'].defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
      return response.data.access_token;
    }
    return null;
  } catch (e) {
    console.error('login error:', e);
    return null;
  }
};

export { login };


