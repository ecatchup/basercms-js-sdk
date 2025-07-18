
import { ApiClient } from './basercms-js-sdk';

/**
 * ブログカテゴリ一覧を取得（ApiClientのgetIndexを利用）
 * @param options 検索オプション
 * @returns カテゴリ配列 or null
 */
interface GetBlogCategoriesOptions {
    [key: string]: any;
}

interface BlogCategory {
    id: number;
    name: string;
    blog_content_id: number;
    title?: string;
    parent_id?: number;
    lft?: number;
    rght?: number;
    created?: string;
    modified?: string;
    [key: string]: any;
}

interface GetBlogCategoriesResult {
    blogCategories?: BlogCategory[];
    [key: string]: any;
}

const getBlogCategories = async (
    blogContentId: number,
    options: GetBlogCategoriesOptions = {}
): Promise<BlogCategory[] | null> => {
    const client = new ApiClient();
    await client.login();
    // blogCategories コントローラーの index API を利用
    const result: GetBlogCategoriesResult | null = await client.getIndex<GetBlogCategoriesResult>({
        endpoint: 'blogCategories',
        options: { blog_content_id: blogContentId, ...options }
    });
    if (result?.blogCategories && Array.isArray(result.blogCategories)) return result.blogCategories;
    return null;
};

export { getBlogCategories };
