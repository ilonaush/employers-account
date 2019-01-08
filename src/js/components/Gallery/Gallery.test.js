import React from 'react';

import Gallery  from './Gallery';

import ReactDOM from 'react-dom';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../reducers/index";


describe('Gallery', () => {
    it('renders', () => {

        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><Gallery/></Provider>, div)
    })
})