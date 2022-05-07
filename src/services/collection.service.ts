import {Collection} from "../models/collection.model";
import {ApiService} from "./core/api.service";

export class CollectionService {
    private static _instance: CollectionService;
    private _apiService = ApiService.getInstance();

    static getInstance(): CollectionService {
        if (!CollectionService._instance) {
            CollectionService._instance = new CollectionService();
        }
        return CollectionService._instance;
    }

    getCollections(): Promise<Collection[]> {
        return this._apiService.get<{ [key: string]: Collection }>("/collections.json")
            .then(res => Object.entries(res || {}).map(([key, value]) => ({ id: key, ...value })));
    }

    createCollection(collection: { title: string, description: string, images: string[] } ): Promise<Collection> {
        return this._apiService.post<{ name: string }>("/collections.json", { ...collection })
            .then((res: { name: string; }) => ({
                 ...collection,
                id: res.name
            }));
    }

    updateCollection(collection: Collection): Promise<Collection> {
        return this._apiService.put(`/collections/${collection.id}.json`, { ...collection })
            .then(() => collection);
    }

    deleteCollection(collectionId: string): Promise<Collection> {
        return this._apiService.delete(`/collections/${collectionId}.json`);
    }
}
