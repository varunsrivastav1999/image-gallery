import axios, {AxiosError, AxiosResponse} from 'axios';

export class ApiService {
    private static instance: ApiService;

    private _axiosInstance = axios.create({
        baseURL: 'https://image-gallery-706ac-default-rtdb.firebaseio.com/',
        responseType: "json",
        headers: { 'Content-Type': 'application/json' }
    });

    constructor() {
        this._errorHandler = this._errorHandler.bind(this);
        this._handleResponse = this._handleResponse.bind(this);
    }

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    get = async <T>(path: string): Promise<T> => {
        return await this._axiosInstance.get(path)
            .then(this._handleResponse)
            .catch(this._errorHandler);
    }

    post = async <T>(path: string, data?: { [key: string]: any }): Promise<T> => {
        return await this._axiosInstance.post(path, data)
            .then(this._handleResponse)
            .catch(this._errorHandler);
    }

    put = async (path: string, data?: { [key: string]: any }) => {
        return await this._axiosInstance.put(path, data)
            .then(this._handleResponse)
            .catch(this._errorHandler);
    }

    delete = async (path: string) => {
        return await this._axiosInstance.delete(path)
            .then(this._handleResponse)
            .catch(this._errorHandler);
    }

    private readonly _errorHandler = (error: AxiosError) => {
        return Promise.reject(error);
    }

    private readonly _handleResponse = (response: AxiosResponse) => {
        return Promise.resolve(response.data);
    }
}
