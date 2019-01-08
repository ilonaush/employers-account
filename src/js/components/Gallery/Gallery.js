import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import actions from "../../reducers/actions";
import {connect} from "react-redux";
import LazyLoadImage from "../../tools/LazyLoad"
import "./Gallery.styl"

class Gallery extends Component {
    render() {
        return (
            <div className='workers-gallery'>
                {this.props.workers.map((item) => {
                    return (
                    <div className='worker-photo' key={item.id}>
                        <LazyLoadImage  src='cat.jpg'/>
                        <div>{item.fullname}</div>
                    </div>
                    )
                })
                }
            </div>
        );
    }
}

Gallery.propTypes = {};

function mapStateToProps(state) {
    return { ...state  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);


