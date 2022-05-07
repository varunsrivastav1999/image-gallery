import React, {useState} from "react";
import {CollectionsResolver} from "../../resolver/collections.resolver";
import "./collections.scss";
import {CollectionStore} from "../../models/collection-store.model";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector} from "../../stores/selectors/collections.selector";
import {Collection} from "../../models/collection.model";
import {If, Then} from "react-if";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import {blobToBase64} from "../../utils/blob-to-base64.utils";
import {CollectionService} from "../../services/collection.service";
import {deleteCollection, saveCollections} from "../../stores/actions/collection.action";
import {useHistory} from "react-router";

const Collections = () => {
    const collectionStore: CollectionStore = useSelector(collectionsSelector);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: '',
        description: '',
        images: [] as string[]
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const history = useHistory();
    const imageCount = 2;

    const onFormUpdate = (key: string, value: string) => {
        setForm({
            ...form,
            [key]: value
        });
    }

    const onAddImage = async (event: any) => {
        const images: string[] = [];
        for (const file of (event.target.files as File[])) {
            images.push(await blobToBase64(file))
        }
        setForm({
            ...form,
            images: images
        });
    }

    const plusBtn = (e: any) => <div className="plus-btn" title="Create Collection">+</div>;

    const createNewCollection = (closeRef: any) => {
        if (!(form.title && form.description) || loading) {
            return;
        }
        setLoading(true);
        const collectionService = CollectionService.getInstance();
        collectionService.createCollection({
            ...form,
            images: form.images || []
        }).then((collection: Collection) => {
            dispatch(saveCollections([collection]));
            closeRef();
        }).catch((error) => {
            alert('Failed to create collection');
        });
    }

    const onCollectionDelete = (collectionId: string) => {
        if (deleting) {
            return;
        }
        setDeleting(true);
        const collectionService = CollectionService.getInstance();
        collectionService.deleteCollection(collectionId).then(_ => {
            dispatch(deleteCollection(collectionId));
        }).catch((error) => {
            alert('Failed to delete collection');
        }).finally(() => {
            setDeleting(false);
        });
    }

    const openCollection = (collectionId: string) => {
        history.push(`/collections/${collectionId}`);
    }

    return (
        <div className="collections-grid">
            {
                collectionStore.collections.map((collection: Collection) => {
                    return (
                        <div className="collection" key={collection.id} onClick={() => openCollection(collection.id)}>
                            <span className="title" title={collection.title}>{collection.title}</span>
                            <span className="description" title={collection.description}>{collection.description}</span>
                            <span className="images">
                                {
                                    collection.images.slice(0, imageCount).map((image: string, index: number) => <img key={index} src={image} alt=""/>)
                                }
                                <If condition={collection.images.length > imageCount}>
                                    <Then>
                                        <span className="images-count">+{ collection.images.length - 3 }</span>
                                    </Then>
                                </If>

                            </span>
                            <div className="delete-btn" onClick={(event) => {
                                event.stopPropagation();
                                onCollectionDelete(collection.id);
                            }}>
                                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                    <path d="M896 234.666667H725.333333v-42.666667c0-70.72-57.28-128-128-128H426.666667c-70.72 0-128 57.28-128 128v42.666667H128a42.666667 42.666667 0 0 0 0 85.333333h42.666667v512c0 70.72 57.28 128 128 128h426.666666c70.72 0 128-57.28 128-128V320h42.666667a42.666667 42.666667 0 0 0 0-85.333333z m-512-42.666667c0-23.573333 19.093333-42.666667 42.666667-42.666667h170.666666c23.573333 0 42.666667 19.093333 42.666667 42.666667v42.666667H384v-42.666667z m384 640c0 23.573333-19.093333 42.666667-42.666667 42.666667H298.666667c-23.573333 0-42.666667-19.093333-42.666667-42.666667V320h512v512z"/>
                                </svg>
                            </div>
                        </div>
                    )
                })
            }
            <div className="collection-add-btn">
                <Popup trigger={plusBtn}  position="center center"
                       closeOnDocumentClick>
                    {
                        (close: any) => (
                            <div className="create-collection-popup">
                                <div className="header">Add new collection</div>

                                <input className="input-control"
                                       type="text"
                                       placeholder="Title"
                                       value={form.title}
                                       onChange={(event) => onFormUpdate('title', event.target.value)}/>

                                <input className="input-control"
                                       type="text"
                                       placeholder="Description"
                                       value={form.description}
                                       onChange={(event) => onFormUpdate('description', event.target.value)}/>

                                <input className="input-control border-0 p-0 rounded-none height-fit"
                                       type="file"
                                       accept="image/*"
                                       multiple
                                       onChange={onAddImage}/>

                                <button disabled={!(form.title && form.description) || loading }
                                        onClick={() => createNewCollection(close)} className="submit-btn">Create</button>
                            </div>
                        )
                    }
                </Popup>
            </div>
        </div>
    );
}

export default CollectionsResolver(Collections);
