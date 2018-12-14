import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Dashboard.styl';
import Intro from "../Intro/Intro";
import DashboardContent from "../DashboardContent/DashboardContent";
import {Route} from "react-router-dom";
import AddWorkerForm from "../AddWorkerForm/AddWorkerForm";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router";
import {compose} from "redux";
import Loader from "../Loader/Loader";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.handleLoading = this.handleLoading.bind(this);
        this.getPage = this.getPage.bind(this);
    }

    getPage(path, pages) {
        return {
            ...pages.find((page) => page.path === path)
        };

    }

    handleLoading(value) {
        this.setState({
            loading: value
        })
    }


    render() {
        console.log('rerender');
        const PAGE = this.getPage(this.props.location.pathname, this.props.pages);
        return (
            <div className='dashboard'>
                {this.state.loading ?
                    <React.Fragment>
                        <Loader/>
                        <Intro>{PAGE.title}</Intro>
                        <DashboardContent handleLoading={this.handleLoading}/>

                    </React.Fragment> :
                    <div>
                        <Intro>{PAGE.title}</Intro>
                        <DashboardContent handleLoading={this.handleLoading}/>
                    </div>
                }
            </div>
        );
    }
}

Dashboard.propTypes = {};

export default compose(connect(state => state,), withRouter)(Dashboard)
