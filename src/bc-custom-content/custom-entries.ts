import { ApiClient } from '../basercms-js-sdk';

/**
 * カスタムエントリー型定義
 */
export interface CustomEntry {
  id: number;
  custom_table_id: number;
  name: string;
  title: string;
  parent_id: number;
  lft: number;
  rght: number;
  level: number;
  status: boolean;
  publish_begin: string | null;
  publish_end: string | null;
  published: string | null;
  creator_id: number;
  modified: string;
  created: string;
  [key: string]: any;
}

/**
 * カスタムエントリー一覧取得
 */
export const getCustomEntries = async (
  apiClient: ApiClient,
  customTableId: number,
  options?: Record<string, any>
): Promise<CustomEntry[]> => {
  const opts = { ...(options || {}), custom_table_id: customTableId };
  const response: any = await apiClient.getIndex({ endpoint: 'customEntries', options: opts });
  if (!response || !response.entries) return [];
  return response.entries as CustomEntry[];
};

/**
 * 単一カスタムエントリー取得
 */
export const getCustomEntry = async (
  apiClient: ApiClient,
  customTableId: number,
  id: string,
  options?: Record<string, any>
): Promise<CustomEntry | null> => {
  const opts = { ...(options || {}), custom_table_id: customTableId };
  const response: any = await apiClient.getView({ endpoint: 'customEntries', id, options: opts });
  return response?.entry ?? null;
};

/**
 * カスタムエントリー新規登録
 */
export const addCustomEntry = async (
  apiClient: ApiClient,
  customTableId: number,
  data: Omit<CustomEntry, 'id'>,
  options?: Record<string, any>
): Promise<CustomEntry | { errors: any } | null> => {
  try {
    const opts = { ...(options || {}), custom_table_id: customTableId };
    const response: any = await apiClient.add({ endpoint: 'customEntries', data, options: opts });
    if (response?.entry) return response.entry as CustomEntry;
    if (response?.errors) return { errors: response.errors };
    return null;
  } catch (error: any) {
    console.error('addCustomEntry error:', error.message);
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    throw error;
  }
};

/**
 * カスタムエントリー編集
 */
export const editCustomEntry = async (
  apiClient: ApiClient,
  customTableId: number,
  id: string,
  data: Partial<Omit<CustomEntry, 'id'>>,
  options?: Record<string, any>
): Promise<CustomEntry | null> => {
  try {
    const opts = { ...(options || {}), custom_table_id: customTableId };
    const response: any = await apiClient.edit({ endpoint: 'customEntries', id, data, options: opts });
    return response?.entry ?? null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('editCustomEntry error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response.data.errors || {})}`);
    }
    console.error('editCustomEntry error:', error.message);
    throw error;
  }
};

/**
 * カスタムエントリー削除
 */
export const deleteCustomEntry = async (
  apiClient: ApiClient,
  customTableId: number,
  id: string,
  options?: Record<string, any>
): Promise<boolean> => {
  try {
    const opts = { ...(options || {}), custom_table_id: customTableId };
    await apiClient.delete({ endpoint: 'customEntries', id, options: opts });
    return true;
  } catch (error: any) {
    console.error('deleteCustomEntry error:', error.message);
    throw error;
  }
};
