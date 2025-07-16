import { ApiClient } from './basercms-js-sdk';
import { addBlogPost } from './bc-blog-post';

(async () => {
  const apiClient = new ApiClient();
  await apiClient.login();

  // ダミー記事データ
  const dummyData = {
    blog_content_id: 1,
    no: null,
    name: 'dummy-post',
    title: 'ダミー記事',
    content: 'これはダミー記事の本文です。',
    detail: '詳細説明',
    blog_category_id: 1,
    user_id: 1,
    status: 1,
    posted: '2025-07-16 21:00:00',
    // eye_catchは省略
  };

  const result = await addBlogPost(apiClient, dummyData);
  console.log('追加結果:', result);

  // エラー詳細も出力
  if (!result) {
    // AxiosのエラーはaddBlogPost内でcatchされているため、
    // ここで再度APIを直接叩いてエラー詳細を取得する
    try {
      const axios = require('axios');
      const baseURL = process.env.API_BASE_URL || 'https://localhost';
      const token = apiClient["axiosInstance"].defaults.headers['Authorization'];
      const response = await axios.post(
        `${baseURL}/baser/api/admin/bc-blog/blog_posts/add.json`,
        dummyData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': token
          },
          httpsAgent: apiClient["axiosInstance"].defaults.httpsAgent,
          responseType: 'json',
        }
      );
      // ここには来ないはず（成功時はresultがnullでないため）
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log('APIエラー詳細:', error.response.data.errors);
      } else {
        console.log('APIエラー詳細取得失敗:', error);
      }
    }
  }
})();
