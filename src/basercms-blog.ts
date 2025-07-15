import { ApiClient } from './basercms-js-sdk';
import { login as userLogin } from './basercms-user';
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.API_BASE_URL;
const IMAGE_BASE_URL = `${BASE_URL}/files/blog/1/blog_posts/`;
const apiClient = new ApiClient();

/**
 * BlogPost
 */
interface BlogPost {
    id: number;
    blog_content_id: number;
    no: number;
    name: string;
    title: string;
    content: string;
    detail: string;
    blog_category: {};
    user_id: number;
    status: number;
    posted: string;
    eye_catch: string;
}

/**
 * Format eye_catch
 * @param blogPost
 */
const formatEyeCatch = (blogPost: BlogPost): BlogPost => ({
    ...blogPost,
    eye_catch: IMAGE_BASE_URL + blogPost.eye_catch
});

/**
 * Get blog posts
 * @param options
 */
const getBlogPosts = async (options?: {}): Promise<BlogPost[]> => {
    const response = await apiClient.getIndex({ endpoint: "blogPosts", ...options });
    if (!response || !response.blogPosts) {
        return [];
    }
    return response?.blogPosts.map((post: any): BlogPost => formatEyeCatch(post)) ?? [];
};

/**
 * Get blog post
 * @param id
 */

type BlogPostResponse = { blogPost: BlogPost };

const getBlogPost = async (id: string): Promise<BlogPost | null> => {
    const response = await apiClient.getView({ endpoint: "blogPosts", id }) as BlogPostResponse | null;
    return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
};

export { getBlogPosts, getBlogPost };
export type { BlogPost };

/**
 * BlogPostを追加
 * @param data BlogPostの内容（id, posted, eye_catch以外）
 */


/**
 * ログインしてブログ記事を追加
 * @param email メールアドレス
 * @param password パスワード
 * @param data 記事データ
 */
const addBlogPost = async (
  email: string,
  password: string,
  data: Omit<BlogPost, 'id' | 'posted' | 'eye_catch'> & { eye_catch?: string }
): Promise<BlogPost | null> => {
  const token = await userLogin(email, password);
  if (!token) {
    console.error('ログイン失敗: email, password, token:', email, password, token);
    throw new Error('ログイン失敗');
  }
  const response = await apiClient.post({ endpoint: "blogPosts", data }) as BlogPostResponse | null;
  return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
};

export { addBlogPost };
