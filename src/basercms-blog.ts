import { ApiClient } from './basercms-js-sdk';
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.API_BASE_URL;
const IMAGE_BASE_URL = `${BASE_URL}/files/blog/1/blog_posts/`;
const apiClient = new ApiClient({ apiBaseUrl: BASE_URL });

/**
 * BlogPost
 */
interface BlogPost {
    id: number;
    title: string;
    content: string;
    detail: string;
    eye_catch: string;
    posted: string;
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
const getBlogPost = async (id: string): Promise<BlogPost | null> => {
    const response = await apiClient.getView({ endpoint: "blogPosts", id });
    return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
};

export { getBlogPosts, getBlogPost };
export type { BlogPost };
