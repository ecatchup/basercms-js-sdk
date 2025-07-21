import { ApiClient } from '../basercms-js-sdk';

/**
 * カスタムコンテンツ型定義
 */
export interface CustomContent {
  id: number;
  custom_table_id: number;
  description?: string;
  template?: string;
  widget_area?: number;
  list_count?: number;
  list_order?: string;
  list_direction?: string;
  content: any;
}

/**
 * カスタムコンテンツ一覧取得
 */
export const getCustomContents = async (
  apiClient: ApiClient,
  options?: Record<string, any>
): Promise<CustomContent[]> => {
  const opts = { ...(options || {}), admin: true };
  const response: any = await apiClient.getIndex({ endpoint: 'customContents', options: opts });
  if (!response || !response.customContents) return [];
  return response.customContents as CustomContent[];
};

/**
 * 単一カスタムコンテンツ取得
 */
export const getCustomContent = async (
  apiClient: ApiClient,
  id: string
): Promise<CustomContent | null> => {
  const response: any = await apiClient.getView({ endpoint: 'customContents', id, options: { admin: true } });
  return response?.customContent ?? null;
};

/**
 * カスタムコンテンツ新規登録
 */
export const addCustomContent = async (
  apiClient: ApiClient,
  data: Omit<CustomContent, 'id'>
): Promise<CustomContent | { errors: any } | null> => {
  try {
    if(data.content.status !== undefined) {
      data.content.self_status = data.content.status;
    }
    const response: any = await apiClient.add({ endpoint: 'customContents', data, options: { admin: true } });
    if (response?.customContent) return response.customContent as CustomContent;
    if (response?.errors) return { errors: response.errors };
    return null;
  } catch (error: any) {
    console.error('addCustomContent error:', error.message);
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    throw error;
  }
};

/**
 * カスタムコンテンツ編集
 */
export const editCustomContent = async (
  apiClient: ApiClient,
  id: string,
  data: Partial<Omit<CustomContent, 'id'>> & { content?: any }
): Promise<CustomContent | null> => {
  try {
    const response: any = await apiClient.edit({ endpoint: 'customContents', id, data, options: { admin: true } });
    return response?.customContent ?? null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('editCustomContent error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response.data.errors || {})}`);
    }
    console.error('editCustomContent error:', error.message);
    throw error;
  }
};

/**
 * カスタムコンテンツ削除
 */
export const deleteCustomContent = async (
  apiClient: ApiClient,
  id: string
): Promise<boolean> => {
  try {
    await apiClient.delete({ endpoint: 'customContents', id, options: { admin: true } });
    return true;
  } catch (error: any) {
    console.error('deleteCustomContent error:', error.message);
    throw error;
  }
};
