import React, {Component} from 'react';
import "./DashboardContent.styl";
import List from "../List/List";
import {Route} from "react-router-dom";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";

export class DashboardContent extends Component {

    dynamicImport (location) {

    }
    render() {
        return (
            <div className='d-content'>
                <Route exact path='/' component={List}/>
                <Route  exact path='/add-worker' render={(routeProps) => <AddWorkerForm handleLoading={this.props.handleLoading} {...routeProps}/>}/>
            </div>
        );
    }
}

DashboardContent.propTypes = {};

export default DashboardContent;
