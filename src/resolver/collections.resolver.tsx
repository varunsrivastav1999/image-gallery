import {Component} from "react";
import React from "react";
import {CollectionService} from "../services/collection.service";
import {connect} from "react-redux";
import {Collection} from "../models/collection.model";
import {saveCollections} from "../stores/actions/collection.action";
import {RootStore} from "../models/root-store.model";

const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

export const CollectionsResolver = (WrappedComponent: any) => {
    class CollectionsResolverFactory extends Component<any, any>{
        collectionService = CollectionService.getInstance();

        componentDidMount() {
            if (!this.props.collectionStore?.loaded) {
                this.collectionService.getCollections().then((collections: Collection[]) => {
                    this.props.saveCollections(collections);
                });
            }
        }

        render() {
            return (
                <>
                    {
                        this.props.collectionStore.loaded ?
                            <WrappedComponent /> :
                            <div style={style}>
                                <p>Please wait while we fetch data from our servers.</p>
                            </div>
                    }
                </>
            );
        }
    }

    const mapStateToProps = (state: RootStore) => ({
        collectionStore: state.collectionReducer
    });

    const mapDispatchToProps = (dispatch: any) => ({
        saveCollections: (collections: Collection[]) => dispatch(saveCollections(collections))
    })

    return connect(mapStateToProps, mapDispatchToProps)(CollectionsResolverFactory);
}
