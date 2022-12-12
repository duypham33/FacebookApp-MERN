import React, {useContext, useEffect, useState} from 'react';
import { inverterContext } from '../App';

const Avatar = ({src, size}) => {
    const {inverter} = useContext(inverterContext);
    
    return (
        <img src={src} alt="avatar" className={size} 
        style={{filter: `invert(${inverter})`}}/>
    )
}

export default Avatar;