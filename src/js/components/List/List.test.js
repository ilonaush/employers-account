import React from 'react';

import List  from './List';

import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "../../reducers/index";

describe('List', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><List/></Provider>, div)
    })
})