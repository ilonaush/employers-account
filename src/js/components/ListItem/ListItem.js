import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./ListItem.styl";

class ListItem extends Component {
     constructor(props) {
         super(props);
         this.state = {
             editing: false
         };
         this.editTime = this.editTime.bind(this);
     }

    editTime(id) {
        console.log('clicked');
        this.setState({
            editing: id
        })
    }

    handleChange({target}) {
         this.setState({
             [target.name]: target.value
         })
    }

    saveTime() {
         this.setState({

         })
    }

    render() {
     console.log(this.props);
     const {editing } = this.state;
     const {worker: {fullname, position, arrival = '', leaving = ''} = {}} = this.props;
        return (
            <tr>
                <td>
                    {fullname}
                </td>
                <td>
                    {position}
                </td>
                <th id='arrival' onClick={(e) => this.editTime(e.target.id)} className='worker-time'>
                    {arrival ? arrival :  editing === 'arrival' ?
                        <input
                            className='time-input'
                            name='arrival'
                            onChange={this.handleChange}
                            placeholder='  :  '
                        />
                        :  'Not found. Click to fill in time of arrival'}
                </th>
                <th id='leaving' onClick={(e) => this.editTime(e.target.id)} onBlur={this.saveTime} className='worker-time'>
                    {leaving ? leaving :  editing === 'leaving' ?
                        <input
                            className='time-input'
                            name='leaving'
                            onChange={this.handleChange}
                            placeholder='  :  '
                        />
                        : 'Not found. Click to fill in time of leaving'}
                </th>
            </tr>
        );
    }
}

ListItem.propTypes = {};

export default ListItem;
