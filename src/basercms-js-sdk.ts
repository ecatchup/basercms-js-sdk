
import axios, { AxiosInstance } from 'axios';
// dotenvは不要
import { login as userLogin } from './bc-user';
import https from 'https';

// dotenvは不要

/**
 * GetIndexRequest
 */
interface GetIndexRequest {
  endpoint: string;
  options?: Record<string, any>;
}


/**
 * GetViewRequest
 */
type GetViewRequest = {
  id: string;
} & GetIndexRequest;

/**
 * ApiClient
 */
export class ApiClient {

  /**
   * APIルート定義
   */
  public readonly ROUTE: Record<string, { plugin: string; controller: string }> = {
    blogPosts: {
      plugin: 'bc-blog',
      controller: 'blog_posts',
    },
  };

  /**
   * Axiosインスタンス
   */
  private axiosInstance: AxiosInstance;

  constructor() {
    const apiBaseUrl = process.env.API_BASE_URL || 'https://localhost';
    const agent = new https.Agent({ rejectUnauthorized: false });
    this.axiosInstance = axios.create({
      baseURL: apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      httpsAgent: agent,
      responseType: 'json',
    });
  }

  /**
   * JWTトークンをセット
   */
  public async login(): Promise<void> {
    const loginUser = process.env.API_USER;
    const loginPassword = process.env.API_PASSWORD;
    if (!loginUser || !loginPassword) {
      throw new Error('API_USER または API_PASSWORD が設定されていません。');
    }
    const token = await userLogin(loginUser, loginPassword);
    this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * レコード追加
   */
  public async add<T>({ endpoint, data }: { endpoint: string; data: any }): Promise<T | null> {
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
   * レコード編集
   */
  public async edit<T>({ endpoint, id, data }: { endpoint: string; id: string; data: any }): Promise<T | null> {
    const url = `/baser/api/admin/${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/edit/${id}.json`;
    try {
      const response = await this.axiosInstance.post(url, { ...data, id });
      return response.data;
    } catch (error) {
      console.error('edit error:', error);
      return null;
    }
  }

  /**
   * レコード削除
   */
  public async delete<T>({ endpoint, id }: { endpoint: string; id: string }): Promise<T | null> {
    const url = `/baser/api/admin/${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/delete/${id}.json`;
    try {
      const response = await this.axiosInstance.post(url, { id });
      return response.data;
    } catch (error) {
      console.error('delete error:', error);
      return null;
    }
  }

  /**
   * 複数レコード取得
   */
  public async getIndex<T>({ endpoint, options }: GetIndexRequest): Promise<T | null> {
    const query = options ? '?' + new URLSearchParams(options as Record<string, string>).toString() : '';
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
   * 単一レコード取得
   */
  public async getView<T>({ endpoint, id }: GetViewRequest): Promise<T | null> {
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