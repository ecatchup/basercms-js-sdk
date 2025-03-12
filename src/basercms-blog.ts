import { Client } from './basercms-js-sdk';
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.API_BASE_URL;
const IMAGE_BASE_URL = `${BASE_URL}/files/blog/1/blog_posts/`;

const client = new Client({ apiBaseUrl: BASE_URL });

interface BlogPost {
    id: number;
    title: string;
    content: string;
    detail: string;
    eye_catch: string;
    posted: string;
}

const formatEyeCatch = (blogPost: BlogPost): BlogPost => ({
    ...blogPost,
    eye_catch: IMAGE_BASE_URL + blogPost.eye_catch
});

export const getBlogPosts = async (options?: {}): Promise<BlogPost[]> => {
    const response = await client.getIndex({ endpoint: "blogPosts", ...options });
    if (!response || !response.blogPosts) {
        return [];
    }
    return response?.blogPosts.map((post: any): BlogPost => formatEyeCatch(post)) ?? [];
};

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
    const response = await client.getView({ endpoint: "blogPosts", id });
    return response?.blogPost ? formatEyeCatch(response.blogPost) : null;
};

export type { BlogPost };
