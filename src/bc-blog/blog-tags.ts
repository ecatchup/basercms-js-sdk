import { ApiClient } from '../basercms-js-sdk';

/**
 * ブログタグ一覧を取得（ApiClientのgetIndexを利用）
 * @param options 検索オプション
 * @returns タグ配列 or null
 */
interface GetBlogTagsOptions {
    [key: string]: any;
}

interface BlogTag {
    id: number;
    name: string;
    created?: string;
    modified?: string;
    [key: string]: any;
}

interface GetBlogTagsResult {
    blogTags?: BlogTag[];
    [key: string]: any;
}

const getBlogTags = async (
    apiClient: ApiClient,
    options: GetBlogTagsOptions = {}
): Promise<BlogTag[] | null> => {
    try {
        const result: GetBlogTagsResult | null = await apiClient.getIndex<GetBlogTagsResult>({
            endpoint: 'blogTags',
            options
        });
        if (result?.blogTags && Array.isArray(result.blogTags)) return result.blogTags;
        return null;
    } catch (error: any) {
        console.error('getBlogTags error:', error.message);
        throw error;
    }
};

/**
 * 単一のブログタグを取得
 * @param apiClient APIクライアント
 * @param tagId タグID
 * @param options 追加オプション
 * @returns タグオブジェクト or null
 */
const getBlogTag = async (
    apiClient: ApiClient,
    tagId: number,
    options: Record<string, any> = {}
): Promise<BlogTag | null> => {
    try {
        const result: { blogTag?: BlogTag } | null = await apiClient.getView<{ blogTag?: BlogTag }>({
            endpoint: 'blogTags',
            id: tagId.toString(),
            options
        });
        if (result?.blogTag) return result.blogTag;
        return null;
    } catch (error: any) {
        console.error('getBlogTag error:', error.message);
        throw error;
    }
};

/**
 * ブログタグを追加
 * @param apiClient APIクライアント
 * @param data タグデータ（idを除く）
 * @returns 追加後のタグオブジェクト、エラー情報、またはnull
 */
const addBlogTag = async (
    apiClient: ApiClient,
    data: Omit<BlogTag, 'id'>
): Promise<BlogTag | { errors: any } | null> => {
    try {
        const response: any = await apiClient.add({
            endpoint: 'blogTags',
            data
        });
        if (response?.blogTag) return response.blogTag as BlogTag;
        if (response?.errors) return { errors: response.errors };
        return null;
    } catch (error: any) {
        console.error('addBlogTag error:', error);
        if (error.response && error.response.data && error.response.data.errors) {
            throw new Error(JSON.stringify({ errors: error.response.data.errors }));
        }
        throw error;
    }
};

/**
 * ブログタグを編集
 * @param apiClient APIクライアント
 * @param tagId タグID
 * @param data 編集データ（idを除く）
 * @returns 編集後のタグオブジェクト or null
 */
const editBlogTag = async (
    apiClient: ApiClient,
    tagId: string,
    data: Partial<Omit<BlogTag, 'id'>>
): Promise<BlogTag | null> => {
    try {
        const response: any = await apiClient.edit({
            endpoint: 'blogTags',
            id: tagId,
            data
        });
        return response?.blogTag ?? null;
    } catch (error: any) {
        if (error.status === 400) {
            console.error('editBlogTag error:', error.message);
            throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.errors || {})}`);
        }
        console.error('editBlogTag error:', error.message);
        throw error;
    }
};

/**
 * ブログタグを削除
 * @param apiClient APIクライアント
 * @param tagId タグID
 * @returns 削除成功: true, 失敗: false
 */
const deleteBlogTag = async (
    apiClient: ApiClient,
    tagId: string
): Promise<boolean> => {
    try {
        await apiClient.delete({
            endpoint: 'blogTags',
            id: tagId
        });
        return true;
    } catch (error: any) {
        console.error('deleteBlogTag error:', error.message);
        throw error;
    }
};

export { getBlogTags, getBlogTag, addBlogTag, editBlogTag, deleteBlogTag };
export type { BlogTag };
