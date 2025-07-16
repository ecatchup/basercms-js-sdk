// import { ApiClient } from './basercms-js-sdk';
// const apiClient = new ApiClient();
import axiosBase from 'axios';

/**
 * ログインしてアクセストークンをセット
 */
import dotenv from 'dotenv';
import https from 'https';
dotenv.config();

const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const baseURL = process.env.API_BASE_URL || 'https://localhost';
    const agent = new https.Agent({ rejectUnauthorized: false });
    const response = await axiosBase.post(
      `${baseURL}/baser/api/admin/baser-core/users/login.json`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: agent,
        responseType: 'json'
      }
    );
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    }
    return null;
  } catch (e) {
    console.error('login error:', e);
    return null;
  }
};

export { login };


