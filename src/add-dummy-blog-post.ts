


import { addBlogPost, ApiClient } from "./index";
import type { BlogPost } from "./index";




const dummyPost: Omit<BlogPost, 'id' | 'eye_catch'> & { eye_catch?: string } = {
  blog_content_id: 1,
  no: null,
  name: "",
  title: "ダミー記事タイトル",
  content: "これはダミー記事の本文です。",
  detail: "詳細本文",
  blog_category_id: 1,
  user_id: 1,
  status: 1,
  posted: "2025-07-15 19:00:00"
};


async function main() {
  const apiClient = new ApiClient();
  try {
    await apiClient.login();
    const result = await addBlogPost(apiClient, dummyPost);
    console.log("記事を登録しました:", result);
  } catch (error: any) {
    console.error("エラー:", error?.response?.data || error);
  }
}

main();
