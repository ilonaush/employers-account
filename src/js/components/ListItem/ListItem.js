import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./ListItem.styl";
import MaskedInput from 'react-text-mask'

class ListItem extends Component {
     constructor(props) {
         super(props);
         this.state = {
             editing: false
         };
         this.editTime = this.editTime.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.saveTime = this.saveTime.bind(this);
     }

    editTime(id) {
        this.setState({
            editing: true
        })
    }

    handleChange({target}) {
         this.setState({
             [target.name]: target.value
         })
    }

    saveTime({target}) {
         const value = target.value;
         console.log(value);
        this.setState({
            [target.name]: target.value,
            editing: false
        });
        const worker = {
            ...this.props.worker,
            [target.name]: target.value
        };
        this.props.editWorkerTime(worker);
    }

    render() {
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
                <th id='arrival' onClick={this.editTime} onBlur={this.saveTime} className='worker-time'>
                    {arrival ? arrival :  editing  ?
                        <MaskedInput
                            mask={[' ', /\d/,  /\d/, ':',  /\d/,  /\d/]}
                            className='time-input'
                            name='arrival'
                            guide={true}
                            onChange={this.handleChange}
                            placeholder='––:––'
                        />
                        :  'Click to select'}
                </th>
                <th id='leaving' onClick={this.editTime} onBlur={this.saveTime} className='worker-time'>
                    {leaving ? leaving : editing  ?
                        <MaskedInput
                            mask={[/\d/,  /\d/, ':', /\d/,  /\d/]}
                            className='time-input'
                            name='leaving'
                            guide={true}
                            onChange={this.handleChange}
                            placeholder='––:––'
                        />
                        : 'Click to select'}
                </th>
            </tr>
        );
    }
}

ListItem.propTypes = {};

export default ListItem;
