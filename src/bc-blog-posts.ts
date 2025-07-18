import { ApiClient } from './basercms-js-sdk';
const BASE_URL = process.env.API_BASE_URL;
const IMAGE_BASE_URL = `${BASE_URL}/files/blog/1/blog_posts/`;

/**
 * ブログ記事の型定義
 */
interface BlogPost {
    id: number;
    blog_content_id: number;
    no: number|null;
    name: string;
    title: string;
    content: string;
    detail: string;
    blog_category_id: number;
    user_id: number;
    status: number;
    posted: string;
    eye_catch: string;
}

/**
 * アイキャッチ画像のURLを整形
 * @param blogPost ブログ記事オブジェクト
 * @returns 整形済みブログ記事オブジェクト
 */
const formatEyeCatch = (blogPost: BlogPost): BlogPost => ({
  ...blogPost,
  eye_catch: blogPost.eye_catch ? (IMAGE_BASE_URL + blogPost.eye_catch) : ''
});

/**
 * ブログ記事一覧を取得
 * @param apiClient ApiClientインスタンス
 * @param options 追加オプション
 * @returns 整形済みブログ記事配列
 */
const getBlogPosts = async (apiClient: ApiClient, options?: {}): Promise<BlogPost[]> => {
  const response: any = await apiClient.getIndex({ endpoint: "blogPosts", ...options });
  if (!response || !response.blogPosts) {
    return [];
  }
  return response.blogPosts.map((post: any): BlogPost => formatEyeCatch(post)) ?? [];
};

/**
 * 単一記事取得APIのレスポンス型
 */
type BlogPostResponse = { blogPost: BlogPost };

/**
 * 単一のブログ記事を取得
 * @param apiClient ApiClientインスタンス
 * @param id 記事ID
 * @returns 整形済みブログ記事 or null
 */
const getBlogPost = async (apiClient: ApiClient, id: string): Promise<BlogPost | null> => {
  const response = await apiClient.getView({ endpoint: "blogPosts", id }) as BlogPostResponse | null;
  return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
};

/**
 * ブログ記事を追加
 * @param apiClient ApiClientインスタンス
 * @param data 記事データ（id, posted, eye_catch以外）
 * @returns 追加後の整形済みブログ記事 or null
 */
type AddBlogPostResult = BlogPost | { errors: any } | null;

const addBlogPost = async (
  apiClient: ApiClient,
  data: Omit<BlogPost, 'id' | 'posted' | 'eye_catch'> & { eye_catch?: string }
): Promise<AddBlogPostResult> => {
  try {
    const response = await apiClient.add({ endpoint: "blogPosts", data }) as any;
    if (response?.blogPost) {
      return formatEyeCatch(response.blogPost);
    }
    if (response?.errors) {
      return { errors: response.errors };
    }
    return null;
  } catch (error: any) {
    console.error('add error:', error);
    if (error.response) {
      console.error('error.response:', error.response);
    }
    if (error.response && error.response.data) {
      console.error('error.response.data:', error.response.data);
    }
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(JSON.stringify({ errors: error.response.data.errors }));
    }
    throw error;
  }
};

/**
 * ブログ記事を編集
 * @param apiClient ApiClientインスタンス
 * @param id 記事ID
 * @param data 編集内容（id, posted, eye_catch以外）
 * @returns 編集後の整形済みブログ記事 or null
 */
const editBlogPost = async (
  apiClient: ApiClient,
  id: string,
  data: Omit<BlogPost, 'id' | 'posted' | 'eye_catch'> & { eye_catch?: string }
): Promise<BlogPost | null> => {
  try {
    const response = await apiClient.edit({ endpoint: "blogPosts", id, data }) as BlogPostResponse | null;
    return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
  } catch (error) {
    console.error('editBlogPost error:', error);
    return null;
  }
};

/**
 * ブログ記事を削除
 * @param apiClient ApiClientインスタンス
 * @param id 記事ID
 * @returns 削除成功: true, 失敗: false
 */
const deleteBlogPost = async (
  apiClient: ApiClient,
  id: string
): Promise<boolean> => {
  try {
    await apiClient.delete({ endpoint: "blogPosts", id });
    return true;
  } catch (error) {
    console.error('deleteBlogPost error:', error);
    return false;
  }
};

export {
  getBlogPosts,
  getBlogPost,
  addBlogPost,
  editBlogPost,
  deleteBlogPost
};
export type { BlogPost };
