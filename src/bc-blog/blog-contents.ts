
import { ApiClient } from '../basercms-js-sdk';

/**
 * ブログコンテンツの型定義
 */
interface BlogContent {
  id: number;
  description?: string;
  template?: string;
  list_count?: number;
  list_direction?: string;
  feed_count?: number;
  tag_use?: boolean;
  comment_use?: boolean;
  comment_approve?: boolean;
  widget_area?: number;
  eye_catch_size?: string;
  use_content?: boolean;
  created?: string;
  modified?: string;
  content?: any;
  [key: string]: any;
}

/**
 * ブログコンテンツ一覧を取得（ApiClientのgetIndexを利用）
 * @param options 検索オプション
 * @returns コンテンツ配列 or null
 */
const getBlogContents = async (
  apiClient: ApiClient,
  options: Record<string, any> = {}): Promise<BlogContent[] | null> => {
  try {
    const result = await apiClient.getIndex<any>({ endpoint: 'blogContents', options });
    if (result?.blogContents && Array.isArray(result.blogContents)) return result.blogContents;
    return null;
  } catch (error: any) {
    console.error('getBlogContents error:', error.message);
    throw error;
  }
};

/**
 * 単一のブログコンテンツを取得
 * @param apiClient APIクライアント
 * @param contentId コンテンツID
 * @param options 追加オプション
 * @returns ブログコンテンツオブジェクト or null
 */
const getBlogContent = async (
  apiClient: ApiClient,
  contentId: number,
  options: Record<string, any> = {}
): Promise<BlogContent | null> => {
  try {
    const result: { blogContent?: BlogContent } | null = await apiClient.getView<{ blogContent?: BlogContent }>({
      endpoint: 'blogContents',
      id: contentId.toString(),
      options
    });
    if (result?.blogContent) return result.blogContent;
    return null;
  } catch (error: any) {
    console.error('getBlogContent error:', error.message);
    throw error;
  }
};

/**
 * ブログコンテンツを追加
 * @param apiClient APIクライアント
 * @param data コンテンツデータ（idを除く）
 * @returns 追加後のコンテンツオブジェクト、エラー情報、またはnull
 */
const addBlogContent = async (
  apiClient: ApiClient,
  data: Omit<BlogContent, 'id'>
): Promise<BlogContent | { errors: any } | null> => {
  try {
    const response: any = await apiClient.add({
      endpoint: 'blogContents',
      data
    });
    if (response?.blogContent) return response.blogContent as BlogContent;
    if (response?.errors) return { errors: response.errors };
    return null;
  } catch (error: any) {
    console.error('addBlogContent error:', error);
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    throw error;
  }
};

/**
 * ブログコンテンツを編集
 * @param apiClient APIクライアント
 * @param contentId コンテンツID
 * @param data 編集データ（idを除く）
 * @returns 編集後のコンテンツオブジェクト or null
 */
const editBlogContent = async (
  apiClient: ApiClient,
  contentId: string,
  data: Partial<Omit<BlogContent, 'id'>>
): Promise<BlogContent | null> => {
  try {
    const response: any = await apiClient.edit({
      endpoint: 'blogContents',
      id: contentId,
      data
    });
    return response?.blogContent ?? null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('editBlogContent error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
    }
    console.error('editBlogContent error:', error.message);
    throw error;
  }
};

/**
 * ブログコンテンツを削除
 * @param apiClient APIクライアント
 * @param contentId コンテンツID
 * @returns 削除成功: true, 失敗: false
 */
const deleteBlogContent = async (
  apiClient: ApiClient,
  contentId: string
): Promise<boolean> => {
  try {
    await apiClient.delete({
      endpoint: 'blogContents',
      id: contentId
    });
    return true;
  } catch (error: any) {
    console.error('deleteBlogContent error:', error.message);
    throw error;
  }
};

export { getBlogContents, getBlogContent, addBlogContent, editBlogContent, deleteBlogContent };
export type { BlogContent };
