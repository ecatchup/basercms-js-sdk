import { ApiClient } from './basercms-js-sdk';
import { deleteBlogPost } from './bc-blog-post';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  // ApiClientインスタンス生成
  const apiClient = new ApiClient();
  // ログイン（トークンセット）
  await apiClient.login();

  // 記事ID 1 を削除
  const result = await deleteBlogPost(apiClient, '1');
  console.log('記事ID 1 削除結果:', result);
})();
