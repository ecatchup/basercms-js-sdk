import { ApiClient } from '../basercms-js-sdk';

/**
 * カスタムフィールド型定義
 */
export interface CustomField {
  id: number;
  name: string;
  title: string;
  type: string;
  status: number;
  default_value?: string;
  validate?: string;
  regex?: string;
  regex_error_message?: string;
  counter?: number;
  auto_convert?: string;
  placeholder?: string;
  size?: number;
  line?: number;
  max_length?: number;
  sort?: number;
  source?: string;
  meta?: string;
  created?: string;
  modified?: string;
}

/**
 * カスタムフィールド一覧取得
 */
export const getCustomFields = async (
  apiClient: ApiClient,
  options?: Record<string, any>
): Promise<CustomField[]> => {
  const opts = { ...(options || {}), admin: true };
  const response: any = await apiClient.getIndex({ endpoint: 'customFields', options: opts });
  if (!response || !response.customFields) return [];
  return response.customFields as CustomField[];
};

/**
 * 単一カスタムフィールド取得
 */
export const getCustomField = async (
  apiClient: ApiClient,
  id: string
): Promise<CustomField | null> => {
  const response: any = await apiClient.getView({ endpoint: 'customFields', id, options: { admin: true } });
  return response?.customField ?? null;
};

/**
 * カスタムフィールド新規登録
 */
export const addCustomField = async (
  apiClient: ApiClient,
  data: Omit<CustomField, 'id'>
): Promise<CustomField | { errors: any } | null> => {
  try {
    const response: any = await apiClient.add({ endpoint: 'customFields', data, options: { admin: true } });
    if (response?.customField) return response.customField as CustomField;
    if (response?.errors) return { errors: response.errors };
    return null;
  } catch (error: any) {
    console.error('addCustomField error:', error);
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    throw error;
  }
};

/**
 * カスタムフィールド編集
 */
export const editCustomField = async (
  apiClient: ApiClient,
  id: string,
  data: Partial<Omit<CustomField, 'id'>>
): Promise<CustomField | null> => {
  try {
    const response: any = await apiClient.edit({ endpoint: 'customFields', id, data, options: { admin: true } });
    return response?.customField ?? null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('editCustomField error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
    }
    console.error('editCustomField error:', error.message);
    throw error;
  }
};

/**
 * カスタムフィールド削除
 */
export const deleteCustomField = async (
  apiClient: ApiClient,
  id: string
): Promise<boolean> => {
  try {
    await apiClient.delete({ endpoint: 'customFields', id, options: { admin: true } });
    return true;
  } catch (error) {
    console.error('deleteCustomField error:', error);
    return false;
  }
};
