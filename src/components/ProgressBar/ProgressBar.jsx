import React from 'react';
import './styles.scss'
const ProgressBar = ({ percent }) => {

    return (
        <div className="progress-bar-container">
            <div className="bar" style={{width: `${percent}%`}}></div>
        </div>
    )
}

export default ProgressBar