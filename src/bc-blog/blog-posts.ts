import { ApiClient } from '../basercms-js-sdk';
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
const getBlogPosts = async (apiClient: ApiClient, options?: Record<string, any>): Promise<BlogPost[]> => {
  try {
    const response: any = await apiClient.getIndex({ endpoint: "blogPosts", options });
    if (!response || !response.blogPosts) {
      return [];
    }
    return response.blogPosts.map((post: any): BlogPost => formatEyeCatch(post)) ?? [];
  } catch (error: any) {
    console.error('getBlogPosts error:', error.message);
    throw error;
  }
};

/**
 * 単一記事取得APIのレスポンス型
 */
type BlogPostResponse = { blogPost: BlogPost };

/**
 * 単一のブログ記事を取得
 * @param apiClient ApiClientインスタンス
 * @param id 記事ID
 * @param options 追加オプション
 * @returns 整形済みブログ記事 or null
 */
const getBlogPost = async (apiClient: ApiClient, id: string, options?: Record<string, any>): Promise<BlogPost | null> => {
  try {
    const response = await apiClient.getView({ endpoint: "blogPosts", id, options }) as BlogPostResponse | null;
    return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
  } catch (error: any) {
    console.error('getBlogPost error:', error.message);
    throw error;
  }
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
  data: Omit<BlogPost, 'id'> & { eye_catch?: string | File | Blob | Buffer | NodeJS.ReadableStream }
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
    if (error.status === 400) {
      console.error('addBlogPost error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
    }
    console.error('addBlogPost error:', error.message);
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
  data: Omit<BlogPost, 'id' | 'posted' | 'eye_catch'> & { eye_catch?: string },
  options?: Record<string, any>
): Promise<BlogPost | null> => {
  try {
    const response = await apiClient.edit({ endpoint: "blogPosts", id, data, options }) as BlogPostResponse | null;
    return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
  } catch (error: any) {
    if (error.status === 400) {
      console.error('editBlogPost error:', error.message);
      throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
    }
    console.error('editBlogPost error:', error.message);
    throw error;
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
  id: string,
  options?: Record<string, any>
): Promise<boolean> => {
  try {
    await apiClient.delete({ endpoint: "blogPosts", id, options });
    return true;
  } catch (error: any) {
    console.error('deleteBlogPost error:', error.message);
    throw error;
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
