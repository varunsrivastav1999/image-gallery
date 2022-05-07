import {StoreActionType} from "../enums/store-action-type.enum";

export interface StoreAction {
    type: StoreActionType,
    payload?: any;
}
