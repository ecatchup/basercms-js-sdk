import { ApiClient } from './basercms-js-sdk';
import { login as userLogin } from './basercms-user';
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.API_BASE_URL;
const IMAGE_BASE_URL = `${BASE_URL}/files/blog/1/blog_posts/`;

/**
 * BlogPost
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
const getBlogPosts = async (apiClient: ApiClient, options?: {}): Promise<BlogPost[]> => {
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

const getBlogPost = async (apiClient: ApiClient, id: string): Promise<BlogPost | null> => {
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
  apiClient: ApiClient,
  data: Omit<BlogPost, 'id' | 'posted' | 'eye_catch'> & { eye_catch?: string }
): Promise<BlogPost | null> => {
  const response = await apiClient.add({ endpoint: "blogPosts", data }) as BlogPostResponse | null;
  return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
};

export { addBlogPost };
