import { ApiClient } from '../basercms-js-sdk';

/**
 * カスタムリンク型定義
 */
export interface CustomLink {
  id: number;
  custom_table_id: number;
  custom_field_id: number;
  no: number;
  parent_id: number | null;
  level: number;
  lft: number;
  rght: number;
  name: string;
  title: string;
  before_head: string | null;
  after_head: string | null;
  description: string | null;
  attention: string | null;
  options: string | null;
  class: string | null;
  group_valid: boolean;
  before_linefeed: boolean;
  after_linefeed: boolean;
  use_loop: boolean;
  display_admin_list: boolean;
  display_front: boolean;
  search_target_admin: boolean;
  search_target_front: boolean;
  use_api: boolean;
  required: boolean | null;
  status: boolean;
  custom_field?: any;
}

/**
 * 単一カスタムリンク取得
 */
export const getCustomLink = async (
  apiClient: ApiClient,
  id: string,
  options?: Record<string, any>
): Promise<CustomLink | null> => {
  const response: any = await apiClient.getView({ endpoint: 'customLinks', id, options });
  return response?.customLink ?? null;
};

/**
 * カスタムリンク一覧取得
 */
export const getCustomLinks = async (
  apiClient: ApiClient,
  options?: Record<string, any>
): Promise<CustomLink[]> => {
  const response: any = await apiClient.getIndex({ endpoint: 'customLinks', options });
  if (!response || !response.customLinks) return [];
  return response.customLinks as CustomLink[];
};

/**
 * カスタムリンク新規追加
 */
export const addCustomLink = async (
  apiClient: ApiClient,
  data: Omit<CustomLink, 'id'>
): Promise<CustomLink | { errors: any } | null> => {
  try {
    const response: any = await apiClient.add({ endpoint: 'customLinks', data });
    if (response?.customLink) return response.customLink as CustomLink;
    if (response?.errors) return { errors: response.errors };
    return null;
  } catch (error: any) {
    console.error('addCustomLink error:', error.message);
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    throw error;
  }
};

/**
 * カスタムリンク編集
 */
export const editCustomLink = async (
  apiClient: ApiClient,
  id: string,
  data: Partial<Omit<CustomLink, 'id'>>
): Promise<CustomLink | null> => {
  try {
    const response: any = await apiClient.edit({ endpoint: 'customLinks', id, data });
    return response?.customLink ?? null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('editCustomLink error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response.data.errors || {})}`);
    }
    console.error('editCustomLink error:', error.message);
    throw error;
  }
};

/**
 * カスタムリンク削除
 */
export const deleteCustomLink = async (
  apiClient: ApiClient,
  id: string
): Promise<boolean> => {
  try {
    await apiClient.delete({ endpoint: 'customLinks', id });
    return true;
  } catch (error: any) {
    console.error('deleteCustomLink error:', error.message);
    throw error;
  }
};
