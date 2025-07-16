import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

/**
 * 管理者API用のJWTトークンを取得
 * @param email メールアドレス
 * @param password パスワード
 * @returns JWTトークン文字列 or null
 */
const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const baseURL = process.env.API_BASE_URL || 'https://localhost';
    const agent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.post(
      `${baseURL}/baser/api/admin/baser-core/users/login.json`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        httpsAgent: agent,
        responseType: 'json',
      }
    );
    return response.data?.access_token ?? null;
  } catch (error) {
    console.error('login error:', error);
    return null;
  }
};

export { login };
