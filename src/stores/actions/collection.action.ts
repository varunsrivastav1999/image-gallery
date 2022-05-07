import {StoreActionType} from "../../enums/store-action-type.enum";
import {StoreAction} from "../../models/store-action.model";
import {Collection} from "../../models/collection.model";

export const saveCollections = (collections: Collection[]): StoreAction => ({
    type: StoreActionType.SAVE_COLLECTIONS,
    payload: { collections }
})

export const deleteCollection = (collectionId: string): StoreAction => ({
    type: StoreActionType.DELETE_COLLECTION,
    payload: { collectionId }
})
