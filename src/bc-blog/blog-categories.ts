
import { ApiClient } from '../basercms-js-sdk';

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
    apiClient: ApiClient,
    blogContentId: number,
    options: GetBlogCategoriesOptions = {}
): Promise<BlogCategory[] | null> => {
    try {
        const result: GetBlogCategoriesResult | null = await apiClient.getIndex<GetBlogCategoriesResult>({
            endpoint: 'blogCategories',
            options: { blog_content_id: blogContentId, ...options }
        });
        if (result?.blogCategories && Array.isArray(result.blogCategories)) return result.blogCategories;
        return null;
    } catch (error: any) {
        console.error('getBlogCategories error:', error.message);
        throw error;
    }
};

/**
 * 単一のブログカテゴリを取得
 * @param apiClient APIクライアント
 * @param categoryId カテゴリID
 * @returns カテゴリオブジェクト or null
 */
const getBlogCategory = async (
    apiClient: ApiClient,
    categoryId: number
): Promise<BlogCategory | null> => {
    try {
        const result: { blogCategory?: BlogCategory } | null = await apiClient.getView<{ blogCategory?: BlogCategory }>({
            endpoint: 'blogCategories',
            id: categoryId.toString()
        });
        if (result?.blogCategory) return result.blogCategory;
        return null;
    } catch (error: any) {
        console.error('getBlogCategory error:', error.message);
        throw error;
    }
};

/**
 * ブログカテゴリを追加
 * @param apiClient APIクライアント
 * @param data カテゴリデータ（idを除く）
 * @returns 追加後のカテゴリオブジェクト、エラー情報、またはnull
 */
const addBlogCategory = async (
    apiClient: ApiClient,
    data: Omit<BlogCategory, 'id'>
): Promise<BlogCategory | { errors: any } | null> => {
    try {
        const response: any = await apiClient.add({
            endpoint: 'blogCategories',
            data,
            options: { admin: true }
        });
        if (response?.blogCategory) return response.blogCategory as BlogCategory;
        if (response?.errors) return { errors: response.errors };
        return null;
    } catch (error: any) {
        console.error('addBlogCategory error:', error);
        if (error.response && error.response.data && error.response.data.errors) {
            throw new Error(JSON.stringify({ errors: error.response.data.errors }));
        }
        throw error;
    }
};

/**
 * ブログカテゴリを編集
 * @param apiClient APIクライアント
 * @param categoryId カテゴリID
 * @param data 編集データ（idを除く）
 * @returns 編集後のカテゴリオブジェクト or null
 */
const editBlogCategory = async (
    apiClient: ApiClient,
    categoryId: string,
    data: Partial<Omit<BlogCategory, 'id'>>
): Promise<BlogCategory | null> => {
    try {
        const response: any = await apiClient.edit({
            endpoint: 'blogCategories',
            id: categoryId,
            data,
            options: { admin: true }
        });
        return response?.blogCategory ?? null;
    } catch (error: any) {
        if (error.status === 400) {
            console.error('editBlogCategory error:', error.message);
            throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
        }
        console.error('editBlogCategory error:', error.message);
        throw error;
    }
};

/**
 * ブログカテゴリを削除
 * @param apiClient APIクライアント
 * @param categoryId カテゴリID
 * @returns 削除成功: true, 失敗: false
 */
const deleteBlogCategory = async (
    apiClient: ApiClient,
    categoryId: string
): Promise<boolean> => {
    try {
        await apiClient.delete({
            endpoint: 'blogCategories',
            id: categoryId,
            options: { admin: true }
        });
        return true;
    } catch (error: any) {
        console.error('deleteBlogCategory error:', error.message);
        throw error;
    }
};

export { getBlogCategories, getBlogCategory, addBlogCategory, editBlogCategory, deleteBlogCategory };
