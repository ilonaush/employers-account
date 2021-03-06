import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, withRouter} from 'react-router-dom';

import './Sidebar.styl';
import {MENU_ITEMS} from "../../constants";
import SidebarMenu from "../SIdebarMenu/SidebarMenu";

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <h5>Dashboard</h5>
                <hr/>
                <SidebarMenu />
            </div>
        );
    }
}

Sidebar.propTypes = {};

export default Sidebar;
