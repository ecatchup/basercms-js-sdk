
import { ApiClient } from '../basercms-js-sdk';

/**
 * ブログコンテンツ一覧を取得（ApiClientのgetIndexを利用）
 * @param options 検索オプション
 * @returns 記事配列 or null
 */
const getBlogContents = async (
  apiClient: ApiClient,
  options: Record<string, any> = {}): Promise<any[] | null> => {
  try {
    const result = await apiClient.getIndex<any>({ endpoint: 'blogContents', options });
    if (result?.blogContents && Array.isArray(result.blogContents)) return result.blogContents;
    return null;
  } catch (error: any) {
    console.error('getBlogContents error:', error.message);
    throw error;
  }
};

export { getBlogContents };
