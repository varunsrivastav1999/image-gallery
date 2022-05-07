import {Collection} from "./collection.model";

export interface CollectionStore {
    loading: boolean;
    loaded: boolean;
    collections: Collection[];
}
