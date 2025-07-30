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
  real_name_1: string;
  real_name_2: string | null;
  email: string;
  nickname: string | null;
  password_modified: string;
  created: string;
  modified: string;
  status: boolean;
}

/**
 * Eメールアドレスからユーザーデータを取得（ApiClientのgetIndexを利用）
 * @param apiClient APIクライアント
 * @param email メールアドレス
 * @returns ユーザーデータ or null
 */
const getUserByEmail = async (
  apiClient: ApiClient,
  email: string): Promise<User | null> => {
  try {
    const result = await apiClient.getIndex<any>({ endpoint: 'users', options: { email, admin: true } });
    if (result?.user) return result.user as User;
    if (result?.users && Array.isArray(result.users) && result.users.length > 0) return result.users[0] as User;
    return null;
  } catch (error: any) {
    console.error('getUserByEmail error:', error.message);
    throw error;
  }
};

/**
 * ユーザーIDからユーザーデータを取得（ApiClientのgetViewを利用）
 * @param apiClient APIクライアント
 * @param id ユーザーID
 * @param userGroupIds ユーザーグループIDの配列（デフォルト: [1]）
 * @returns ユーザーデータ or null
 */
const getUser = async (
  apiClient: ApiClient,
  id: string,
  userGroupIds: number[] = [1]
): Promise<User | null> => {
  try {
    const result = await apiClient.getView<any>({ 
      endpoint: 'users', 
      id, 
      options: { 
        admin: true,
        'user_groups._ids': userGroupIds
      } 
    });
    if (result?.user) return result.user as User;
    return null;
  } catch (error: any) {
    console.error('getUser error:', error.message);
    throw error;
  }
};

/**
 * ユーザー一覧を取得（ApiClientのgetIndexを利用）
 * @param apiClient APIクライアント
 * @param options 検索オプション
 * @returns ユーザー配列 or null
 */
const getUsers = async (
  apiClient: ApiClient,
  options: Record<string, any> = {}): Promise<User[] | null> => {
  try {
    const result = await apiClient.getIndex<any>({ endpoint: 'users', options: { ...options, admin: true } });
    if (result?.users && Array.isArray(result.users)) return result.users as User[];
    return null;
  } catch (error: any) {
    console.error('getUsers error:', error.message);
    throw error;
  }
};

/**
 * ユーザー作成用データ型定義
 */
export interface NewUser {
  name: string;
  password_1: string;
  password_2: string;
  real_name_1: string;
  real_name_2?: string | null;
  email: string;
  nickname?: string | null;
  status?: boolean;
  user_groups?: {
    _ids: number[];
  };
}

/**
 * ユーザーを追加
 * @param apiClient APIクライアント
 * @param data ユーザーデータ
 * @returns 作成されたユーザーオブジェクト or null
 */
const addUser = async (
  apiClient: ApiClient,
  data: NewUser
): Promise<User | null> => {
  try {
    const response: any = await apiClient.add({
      endpoint: 'users',
      data,
      options: { admin: true }
    });
    return response?.user ?? null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('addUser error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
    }
    console.error('addUser error:', error.message);
    throw error;
  }
};

/**
 * ユーザーを編集
 * @param apiClient APIクライアント
 * @param userId ユーザーID
 * @param data 編集データ（idを除く）
 * @returns 編集後のユーザーオブジェクト or null
 */
const editUser = async (
  apiClient: ApiClient,
  userId: string,
  data: Partial<Omit<User, 'id'>>
): Promise<User | null> => {
  try {
    const response: any = await apiClient.edit({
      endpoint: 'users',
      id: userId,
      data,
      options: { admin: true }
    });
    return response?.user ?? null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('editUser error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
    }
    console.error('editUser error:', error.message);
    throw error;
  }
};

/**
 * ユーザーを削除
 * @param apiClient APIクライアント
 * @param userId ユーザーID
 * @returns 削除成功: true, 失敗: false
 */
const deleteUser = async (
  apiClient: ApiClient,
  userId: string
): Promise<boolean> => {
  try {
    await apiClient.delete({
      endpoint: 'users',
      id: userId,
      options: { admin: true }
    });
    return true;
  } catch (error: any) {
    console.error('deleteUser error:', error.message);
    throw error;
  }
};

export { login, getUserByEmail, getUser, getUsers, addUser, editUser, deleteUser };
