import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./List.styl";
import {bindActionCreators} from "redux";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import ListItem from "../ListItem/ListItem";

class List extends Component {


    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Position
                        </th>
                        <th className='time'>
                            Arrival
                        </th>
                        <th className='time'>
                            Leaving
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.workers.map ((worker) =>
                        <ListItem key={worker.id} worker={worker} editWorkerTime={this.props.actions.editWorkTime}/>
                    )}
                </tbody>
            </table>
        );
    }
}

List.propTypes = {};

function mapStateToProps(state) {
    return { workers: state.workers  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
