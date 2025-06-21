import React from 'react';
import "./Title.css";

function Title({ name }){
    return(
        <div className='titleContainer'>
            <h1 className='title'>{name}</h1>
        </div>
    );
}

export default Title;
