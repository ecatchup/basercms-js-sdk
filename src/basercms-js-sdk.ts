import axiosBase from 'axios';
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
    constructor({apiBaseUrl}: { apiBaseUrl?: string }) {
        const agent = new https.Agent({rejectUnauthorized: false});
        this.axiosInstance = axiosBase.create({
            baseURL: apiBaseUrl,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            httpsAgent: agent,
            responseType: 'json'
        });
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

export type {GetIndexRequest, GetViewRequest};
export {ApiClient};
