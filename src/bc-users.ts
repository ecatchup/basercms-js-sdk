import axios from 'axios';
import https from 'https';

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

import { ApiClient } from './basercms-js-sdk';

/**
 * Eメールアドレスからユーザーデータを取得（ApiClientのgetIndexを利用）
 * @param email メールアドレス
 * @returns ユーザーデータ or null
 */
const getUserByEmail = async (email: string): Promise<any | null> => {
  const client = new ApiClient();
  await client.login();
  // users コントローラーの index API を利用
  const result = await client.getIndex<any>({ endpoint: 'users', options: { email, admin: true } });
  if (result?.user) return result.user;
  if (result?.users && Array.isArray(result.users) && result.users.length > 0) return result.users[0];
  return null;
};

// ...existing code...
/**
 * ユーザーIDからユーザーデータを取得（ApiClientのgetViewを利用）
 * @param id ユーザーID
 * @returns ユーザーデータ or null
 */
const getUser = async (id: string): Promise<any | null> => {
  const client = new ApiClient();
  await client.login();
  // users コントローラーの view API を利用
  const result = await client.getView<any>({ endpoint: 'users', id, options: { admin: true } });
  if (result?.user) return result.user;
  return null;
};

// ...existing code...
/**
 * ユーザー一覧を取得（ApiClientのgetIndexを利用）
 * @param options 検索オプション
 * @returns ユーザー配列 or null
 */
const getUsers = async (options: Record<string, any> = {}): Promise<any[] | null> => {
  const client = new ApiClient();
  await client.login();
  // users コントローラーの index API を利用
  const result = await client.getIndex<any>({ endpoint: 'users', options: { ...options, admin: true } });
  if (result?.users && Array.isArray(result.users)) return result.users;
  return null;
};

export { login, getUserByEmail, getUser, getUsers };
