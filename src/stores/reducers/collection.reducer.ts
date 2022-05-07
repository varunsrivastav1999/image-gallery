import {CollectionStore} from "../../models/collection-store.model";
import {StoreAction} from "../../models/store-action.model";
import {Collection} from "../../models/collection.model";
import {StoreActionType} from "../../enums/store-action-type.enum";
import collections from "../../components/collections/collections";
import collection from "../../components/collection/collection";

const _initialState: CollectionStore = {
    loading: false,
    loaded: false,
    collections: []
};

export const collectionReducer = (state: CollectionStore = _initialState, action: StoreAction) => {
    switch (action.type) {
        case StoreActionType.SAVE_COLLECTIONS: {
            const collectionsMap: { [collectionId: string]: Collection } = {};
            [...state.collections].forEach((collection: Collection) => collectionsMap[collection.id] = collection);
            [...(action.payload.collections || [])].forEach((collection: Collection) => collectionsMap[collection.id] = collection);
            return {
                ...state,
                loaded: true,
                loading: false,
                collections: Object.values(collectionsMap)
            };
        }
        case StoreActionType.DELETE_COLLECTION: {
            const collectionId: Collection['id'] = action.payload.collectionId;
            return {
                ...state,
                loaded: true,
                loading: false,
                collections: [...state.collections].filter((collection: Collection) => collection.id !== collectionId)
            };
        }
        default: return _initialState;
    }
}
