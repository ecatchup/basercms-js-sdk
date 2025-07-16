import axiosBase from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { login as userLogin } from './basercms-user';
import https from "https";

/**
 * GetIndexRequest
 */
interface GetIndexRequest {
    endpoint: string;
    options?: {};
}

/**
 * GetViewRequest
 */
type GetViewRequest = {
    id: string;
} & GetIndexRequest;

/**
 * Client
 */
class ApiClient {

    /**
     * Route
     * @private
     */
    readonly ROUTE: Record<string, { plugin: string; controller: string }> = {
        blogPosts: {
            plugin: 'bc-blog',
            controller: 'blog_posts',
        }
    };

    /**
     * Axios instance
     * @private
     */
    private axiosInstance: any;

    /**
     * Constructor
     * @param apiBaseUrl
     */
    constructor() {
        const apiBaseUrl = process.env.API_BASE_URL || 'https://localhost';
        const agent = new https.Agent({rejectUnauthorized: false});
        this.axiosInstance = axiosBase.create({
            baseURL: apiBaseUrl,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            httpsAgent: agent,
            responseType: 'json'
        });
    }

    /**
     * ラッパー: basercms-user.ts の login を呼び出し、トークンを内部に保持
     */
    async login(): Promise<void> {
        const loginUser = process.env.API_USER;
        const loginPassword = process.env.API_PASSWORD;
        if (!loginUser || !loginPassword) {
            throw new Error('API_USER または API_PASSWORD が設定されていません。');
        }
        const token = await userLogin(loginUser, loginPassword);
        this.axiosInstance.defaults.headers['Authorization'] = "Bearer " + token;
    }

    /**
     * レコードを追加
     * @param endpoint
     * @param data
     */
    async add<T>({ endpoint, data }: { endpoint: string; data: any }): Promise<T | null> {
        const url = `/baser/api/admin/${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/add.json`;
        try {
            const response = await this.axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            console.error('add error:', error);
            return null;
        }
    }

    /**
     * Get multiple records
     * @param endpoint
     * @param options
     */
    async getIndex<T>({endpoint, options}: GetIndexRequest) {
        const query = options ? '?' + new URLSearchParams(options).toString() : '';
        const url = `/baser/api/${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/index.json${query}`;
        try {
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('getIndex error:', error);
            return null;
        }
    }

    /**
     * Get a single record
     * @param endpoint
     * @param id
     */
    async getView<T>({endpoint, id}: GetViewRequest) {
        const url = `/baser/api/${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/view/${id}.json`;
        try {
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('getView error:', error);
            return null;
        }
    }
    
}

export type { GetIndexRequest, GetViewRequest };
export { ApiClient };
