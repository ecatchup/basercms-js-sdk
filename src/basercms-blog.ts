import { type BlogPost, Client } from './basercms-js-sdk';

const BASE_URL = 'https://baser-astro.localhost';
const IMAGE_BASE_URL = `${BASE_URL}/files/blog/1/blog_posts/`;

const client = new Client();

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
