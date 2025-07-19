import { ApiClient } from "./basercms-js-sdk";
import { addBlogPost } from "./bc-blog/blog-posts";
async function main() {
    const apiClient = new ApiClient(); 
    try {
        await apiClient.login();
        const data = { blog_content_id: 1, no: null, name: '', title: 'ダミー記事', content: 'ダミー本文', detail: 'ダミー詳細', blog_category_id: 1, user_id: 1, status: 1, posted: '2025-07-01 00:00:00' };
        const result = await addBlogPost(apiClient, data);
        console.log('Blog post added:', result);
    } catch (error: any) {
        console.error('Error adding blog post:', error.message);
    }
}
main();