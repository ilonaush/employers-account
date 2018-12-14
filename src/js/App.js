import React from 'react';
import { Provider } from 'react-redux';
import Layout from "./components/Layout/Layout";
import {store} from "./reducers/index";
import {saveStore} from "./services/LocalStorageService";

store.subscribe(() => {
    saveStore(store.getState());
});

export default class App extends React.Component{
    constructor() {
        super();
    }



    render() {
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        )
    }
}
