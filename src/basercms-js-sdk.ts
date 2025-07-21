import axios, { AxiosInstance } from 'axios';
import { login as userLogin } from './baser-core/users';
import https from 'https';

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
    users: {
      plugin: 'baser-core',
      controller: 'users',
    },
    blogCategories: {
      plugin: 'bc-blog',
      controller: 'blog_categories',
    },
    blogContents: {
      plugin: 'bc-blog',
      controller: 'blog_contents',
    },
    customFields: {
      plugin: 'bc-custom-content',
      controller: 'custom_fields',
    },
    customTables: {
      plugin: 'bc-custom-content',
      controller: 'custom_tables',
    },
        customContents: {
          plugin: 'bc-custom-content',
          controller: 'custom_contents',
        },
        customEntries: {
          plugin: 'bc-custom-content',
          controller: 'custom_entries',
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
    try {
      const token = await userLogin(loginUser, loginPassword);
      this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * レコード追加
   */
  public async add<T>({ endpoint, data, options }: { endpoint: string; data: any; options?: Record<string, any> }): Promise<T | null> {
    let baseUrl = '/baser/api/';
    let opts = options ? { ...options } : undefined;
    if (opts && opts['admin'] !== undefined) {
      baseUrl += 'admin/';
      delete opts['admin'];
    }
    const query = opts ? '?' + new URLSearchParams(opts as Record<string, string>).toString() : '';
    const url = `${baseUrl}${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/add.json${query}`;

    // どのフィールドでもファイル型があればmultipart/form-dataで送信
    let sendData = data;
    let config: any = {};
    const isFile = (v: any) => {
      if (!v) return false;
      if (typeof window !== 'undefined') {
        // ブラウザ
        return v instanceof File || v instanceof Blob;
      } else {
        // Node.js
        return (typeof Buffer !== 'undefined' && Buffer.isBuffer(v)) || (v && typeof v.pipe === 'function');
      }
    };
    const hasFileField = data && Object.values(data).some(isFile);
    if (hasFileField) {
      let formData: any;
      if (typeof window === 'undefined') {
        // Node.js
        const FormData = require('form-data');
        formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined || value === null) return;
          if (isFile(value)) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        });
        sendData = formData;
        config.headers = formData.getHeaders();
      } else {
        // ブラウザ
        formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined || value === null) return;
          formData.append(key, value);
        });
        sendData = formData;
        // headersは自動
      }
    }
    try {
      const response = await this.axiosInstance.post(url, sendData, config);
      return response.data;
    } catch (error: any) {
      if (
        error.code === 'ECONNREFUSED' ||
        error.code === 'ENOTFOUND' ||
        error.code === 'ETIMEDOUT' ||
        (error.response && (error.response.status === 503 || error.response.status === 502 || error.response.status === 504))
      ) {
        throw new Error('サーバーに接続できませんでした。APIサーバーの状態を確認してください。');
      }
      throw error;
    }
  }

  /**
   * レコード編集
   */
  public async edit<T>({ endpoint, id, data, options }: { endpoint: string; id: string; data: any; options?: Record<string, any> }): Promise<T | null> {
    let baseUrl = '/baser/api/';
    let opts = options ? { ...options } : undefined;
    if (opts && opts['admin'] !== undefined) {
      baseUrl += 'admin/';
      delete opts['admin'];
    }
    const query = opts ? '?' + new URLSearchParams(opts as Record<string, string>).toString() : '';
    const url = `${baseUrl}${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/edit/${id}.json${query}`;
    try {
      const response = await this.axiosInstance.post(url, { ...data, id });
      return response.data;
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        console.error('サーバーに接続できませんでした。APIサーバーの状態を確認してください。', error.message);
        return null;
      }
      throw error;
    }
  }

  /**
   * レコード削除
   */
  public async delete<T>({ endpoint, id, options}: { endpoint: string; id: string; options?: Record<string, any> }): Promise<T | null> {
    let baseUrl = '/baser/api/';
    let opts = options ? { ...options } : undefined;
    if (opts && opts['admin'] !== undefined) {
      baseUrl += 'admin/';
      delete opts['admin'];
    }
    const query = opts ? '?' + new URLSearchParams(opts as Record<string, string>).toString() : '';
    const url = `${baseUrl}${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/delete/${id}.json${query}`;
    try {
      const response = await this.axiosInstance.post(url, { id });
      return response.data;
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        console.error('サーバーに接続できませんでした。APIサーバーの状態を確認してください。', error.message);
        return null;
      }
      throw error;
    }
  }

  /**
   * 複数レコード取得
   */
  public async getIndex<T>({ endpoint, options }: GetIndexRequest): Promise<T | null> {
    let baseUrl = '/baser/api/';
    if (options && options['admin'] !== undefined) {
      baseUrl += 'admin/';
      delete options['admin'];
    }
    const query = options ? '?' + new URLSearchParams(options as Record<string, string>).toString() : '';
    const url = `${baseUrl}${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/index.json${query}`;
    try {
      const response = await this.axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        console.error('サーバーに接続できませんでした。APIサーバーの状態を確認してください。', error.message);
        return null;
      }
      console.error('getIndex error:', error);
      return null;
    }
  }

  /**
   * 単一レコード取得
   */
  public async getView<T>({ endpoint, id, options }: GetViewRequest): Promise<T | null> {
    let baseUrl = '/baser/api/';
    let opts = options ? { ...options } : undefined;
    if (opts && opts['admin'] !== undefined) {
      baseUrl += 'admin/';
      delete opts['admin'];
    }
    const query = opts ? '?' + new URLSearchParams(opts as Record<string, string>).toString() : '';
    const url = `${baseUrl}${this.ROUTE[endpoint].plugin}/${this.ROUTE[endpoint].controller}/view/${id}.json${query}`;
    try {
      const response = await this.axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        console.error('サーバーに接続できませんでした。APIサーバーの状態を確認してください。', error.message);
        return null;
      }
      console.error('getView error:', error);
      return null;
    }
  }
}