import React, {Component, Suspense} from 'react';
import "./DashboardContent.styl";
import List from "../List/List";
import {Route} from "react-router-dom";


const AddWorkerForm = React.lazy(() => import(/* webpackChunkName: "addForm" */"components/AddWorkerForm/AddWorkerForm"));
const FireWorkerForm = React.lazy(() => import(/* webpackChunkName: "fireForm" */"components/FireWorkerForm/FireWorkerForm"));


export class DashboardContent extends Component {


    render() {
        return (
            <div className='d-content'>
                <Route exact path='/' component={List}/>
                <Route  exact path='/add-worker' render={(routeProps) =>  <Suspense fallback={<div>Loading...</div>}>
                    <AddWorkerForm handleLoading = {this.props.handleLoading} {...routeProps}/></Suspense>}/>
                <Route  exact path='/fire-worker' render={(routeProps) => <Suspense fallback={<div>Loading...</div>}>
                    <FireWorkerForm handleLoading = {this.props.handleLoading} {...routeProps}/></Suspense>}/>
            </div>
        );
    }
}

DashboardContent.propTypes = {};

export default DashboardContent;
