import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {MENU_ITEMS} from "../../constants";
import {Link, NavLink} from "react-router-dom";
import "./SidebarMenu.styl";

class SidebarMenu extends PureComponent {
    render() {
        return (
            <div>
                <ul>
                    {MENU_ITEMS.map((link) => {
                        return (
                            <li key={link.name}>
                                <NavLink to={link.to}>{link.name}</NavLink>
                            </li>
                        )
                        }
                    )}
                </ul>
            </div>
        );
    }
}

SidebarMenu.propTypes = {};

export default SidebarMenu;
