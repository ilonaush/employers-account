import "./Intro.styl";
import React from 'react';

const Intro = ({children, ...props}) => {
    console.log(props, children);
    return (
    <div className='intro'>
        {children}
    </div>
    )
};

export default Intro;
