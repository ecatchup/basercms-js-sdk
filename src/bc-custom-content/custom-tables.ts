
import { ApiClient } from '../basercms-js-sdk';

/**
 * カスタムテーブル型定義
 */
export interface CustomTable {
  id: number;
  type: string;
  name: string;
  title: string;
  display_field: string;
  has_child: number;
  created: string;
  modified: string;
}

/**
 * カスタムテーブル一覧取得
 */
export const getCustomTables = async (
  apiClient: ApiClient,
  options?: Record<string, any>
): Promise<CustomTable[]> => {
  const opts = { ...(options || {}), admin: true };
  const response: any = await apiClient.getIndex({ endpoint: 'customTables', options: opts });
  if (!response || !response.customTables) return [];
  return response.customTables as CustomTable[];
};

/**
 * 単一カスタムテーブル取得
 */
export const getCustomTable = async (
  apiClient: ApiClient,
  id: string
): Promise<CustomTable | null> => {
  const response: any = await apiClient.getView({ endpoint: 'customTables', id, options: { admin: true } });
  return response?.customTable ?? null;
};

/**
 * カスタムテーブル新規登録
 */
export const addCustomTable = async (
  apiClient: ApiClient,
  data: Omit<CustomTable, 'id'>
): Promise<CustomTable | { errors: any } | null> => {
  try {
    const response: any = await apiClient.add({ endpoint: 'customTables', data, options: { admin: true } });
    if (response?.customTable) return response.customTable as CustomTable;
    if (response?.errors) return { errors: response.errors };
    return null;
  } catch (error: any) {
    console.error('addCustomTable error:', error);
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    throw error;
  }
};

/**
 * カスタムテーブル編集
 */
export const editCustomTable = async (
  apiClient: ApiClient,
  id: string,
  data: Partial<Omit<CustomTable, 'id'>>
): Promise<CustomTable | null> => {
  try {
    const response: any = await apiClient.edit({ endpoint: 'customTables', id, data, options: { admin: true } });
    return response?.customTable ?? null;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
        console.error('editCustomTable error:', error);
        throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    console.error('editCustomTable error:', error.message);
    throw error;
  }
};

/**
 * カスタムテーブル削除
 */
export const deleteCustomTable = async (
  apiClient: ApiClient,
  id: string
): Promise<boolean> => {
  try {
    await apiClient.delete({ endpoint: 'customTables', id, options: { admin: true } });
    return true;
  } catch (error: any) {
    console.error('deleteCustomTable error:', error.message);
    throw error;
  }
};
