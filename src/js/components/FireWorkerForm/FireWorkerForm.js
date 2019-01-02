import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../reducers/actions';
import { bindActionCreators } from "redux";
import {Query} from "../../services/RequestService";
import "../AddWorkerForm/AddWorkerForm.styl";
import {withRouter} from "react-router-dom";

export class FireWorkerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            position: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();
        const worker = {
            fullname: `${this.state.name} ${this.state.surname}`,
            position: this.state.position,
            id: Date.now()
        };

        this.props.actions.employWorker(worker);
        const response = this.handleLoad();


    }

    async handleLoad() {
        this.props.handleLoading(true);
        const response = await Query();
        if (response) {
            this.props.handleLoading(false);
            this.props.history.push('/');
        }
    }

    handleChange(value, name) {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <form className='addWorkerForm'>
                    <select>
                        {this.props.workers.map((worker) =>
                            <option value={worker.id} onClick={() => this.props.fireWorker(worker)}>{worker.surname}</option>
                        )}
                    </select>
                    <textarea placeholder='Describe reason please'/>
                    <button type='submit' onClick={this.onSubmit}>Employ a worker</button>
                </form>
            </div>
        );
    }
}

FireWorkerForm.propTypes = {};


function mapStateToProps(state) {
    return { workers: state.workers  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FireWorkerForm);
