import {RootStore} from "../../models/root-store.model";

export const collectionsSelector = (state: RootStore) => state.collectionReducer;
