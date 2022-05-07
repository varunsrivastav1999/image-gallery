import {Redirect, Route, Switch} from "react-router";
import React from "react";
import Collections from "./components/collections/collections";
import CollectionContainer from "./components/collection/collection";

export const AppRouter = () => {
    return (
        <Switch>
            <Redirect exact
                      from="/"
                      to="/collections" />

            <Route exact path="/collections" component={Collections} />
            <Route path="/collections/:collectionId" component={CollectionContainer} />
        </Switch>
    )
}
