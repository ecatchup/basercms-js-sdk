
import { ApiClient } from './basercms-js-sdk';

/**
 * ブログコンテンツ一覧を取得（ApiClientのgetIndexを利用）
 * @param options 検索オプション
 * @returns 記事配列 or null
 */
const getBlogContents = async (options: Record<string, any> = {}): Promise<any[] | null> => {
  const client = new ApiClient();
  await client.login();
  // blogContents コントローラーの index API を利用
  const result = await client.getIndex<any>({ endpoint: 'blogContents', options });
  if (result?.blogContents && Array.isArray(result.blogContents)) return result.blogContents;
  return null;
};

export { getBlogContents };
