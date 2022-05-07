import {CollectionStore} from "../../models/collection-store.model";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector} from "../../stores/selectors/collections.selector";
import React, {useEffect, useState} from "react";
import {Collection} from "../../models/collection.model";
import {useParams} from "react-router";
import {Else, If, Then} from "react-if";
import "./collection.scss";
import {CollectionsResolver} from "../../resolver/collections.resolver";
import {getRandomColor} from "../../utils/random-color.utils";
import {blobToBase64} from "../../utils/blob-to-base64.utils";
import {saveCollections} from "../../stores/actions/collection.action";
import {CollectionService} from "../../services/collection.service";

const CollectionContainer: React.FunctionComponent = () => {
    const collectionStore: CollectionStore = useSelector(collectionsSelector);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [collection, setCollection] = useState<Collection>();
    const { collectionId } = useParams();

    useEffect(() => {
        if (!!collectionStore.collections.length) {
            const collection: Collection = collectionStore.collections.find(item => collectionId === item.id)!;
            if (collection) {
                setCollection(collection);
            }
        }
    }, [collectionStore.collections]);

    const onAddImage = async (event: any) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const images: string[] = [];
        for (const file of (event.target.files as File[])) {
            images.push(await blobToBase64(file))
        }
        const updatedCollection: Collection = {
            ...collection!,
            images: [
                ...(collection?.images || []),
                ...images
            ]
        };
        const collectionService = CollectionService.getInstance();
        collectionService.updateCollection(updatedCollection).then(() => {
            dispatch(saveCollections([updatedCollection]));
        }).catch((error) => {
            alert('Failed to add images');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="collection-container">
            <If condition={!!collection}>
                <Then>
                    <span className="title">{collection?.title}</span>
                    <span className="description">{collection?.description}</span>
                    <div className="images-grid">
                        {
                            collection?.images.map((image, index) => <img src={image} key={index} alt=""/>)
                        }
                        <div className="image-add-btn">
                            <div className="plus-btn">
                                <span>+</span>
                                <input type="file"
                                       accept="image/*"
                                       multiple
                                       onChange={onAddImage}/>
                            </div>
                        </div>
                    </div>
                </Then>
                <Else>
                    <p className="product-not-found" style={{color: getRandomColor()}}>Product not found!!</p>
                </Else>
            </If>
        </div>
    );
}

export default CollectionsResolver(CollectionContainer);
