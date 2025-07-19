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
  } catch (error: any) {
    if (
      error.code === 'ECONNREFUSED' ||
      error.code === 'ENOTFOUND' ||
      error.code === 'ETIMEDOUT' ||
      (error.response && (error.response.status === 503 || error.response.status === 502 || error.response.status === 504))
    ) {
      throw new Error('サーバーに接続できませんでした。APIサーバーの状態を確認してください。');
    }
    throw error;
  }
};

import { ApiClient } from '../basercms-js-sdk';

/**
 * ユーザー型定義
 */
export interface User {
  id: number;
  name: string;
  password: string;
  real_name_1: string;
  real_name_2: string;
  email: string;
  nickname: string;
  password_modified: string;
  created: string;
  modified: string;
  status: number;
}

/**
 * Eメールアドレスからユーザーデータを取得（ApiClientのgetIndexを利用）
 * @param email メールアドレス
 * @returns ユーザーデータ or null
 */
const getUserByEmail = async (
  apiClient: ApiClient,
  email: string): Promise<any | null> => {
  try {
    const result = await apiClient.getIndex<any>({ endpoint: 'users', options: { email, admin: true } });
    if (result?.user) return result.user;
    if (result?.users && Array.isArray(result.users) && result.users.length > 0) return result.users[0];
    return null;
  } catch (error: any) {
    console.error('getUserByEmail error:', error.message);
    throw error;
  }
};

/**
 * ユーザーIDからユーザーデータを取得（ApiClientのgetViewを利用）
 * @param id ユーザーID
 * @returns ユーザーデータ or null
 */
const getUser = async (
  apiClient: ApiClient,
  id: string): Promise<any | null> => {
  try {
    const result = await apiClient.getView<any>({ endpoint: 'users', id, options: { admin: true } });
    if (result?.user) return result.user;
    return null;
  } catch (error: any) {
    console.error('getUser error:', error.message);
    throw error;
  }
};

/**
 * ユーザー一覧を取得（ApiClientのgetIndexを利用）
 * @param options 検索オプション
 * @returns ユーザー配列 or null
 */
const getUsers = async (
  apiClient: ApiClient,
  options: Record<string, any> = {}): Promise<any[] | null> => {
  try {
    const result = await apiClient.getIndex<any>({ endpoint: 'users', options: { ...options, admin: true } });
    if (result?.users && Array.isArray(result.users)) return result.users;
    return null;
  } catch (error: any) {
    console.error('getUsers error:', error.message);
    throw error;
  }
};

export { login, getUserByEmail, getUser, getUsers };
