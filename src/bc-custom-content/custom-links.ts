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
  const opts = { ...(options || {}), admin: true };
  const response: any = await apiClient.getView({ endpoint: 'customLinks', id, options: opts });
  return response?.customLink ?? null;
};

/**
 * カスタムリンク一覧取得
 */
export const getCustomLinks = async (
  apiClient: ApiClient,
  options?: Record<string, any>
): Promise<CustomLink[]> => {
  const opts = { ...(options || {}), admin: true };
  const response: any = await apiClient.getIndex({ endpoint: 'customLinks', options: opts });
  if (!response || !response.customLinks) return [];
  return response.customLinks as CustomLink[];
};
