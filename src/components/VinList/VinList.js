import React from 'react';
import './styles.scss'
import CheckBox from '../Checkbox'

const VinList = ({ vins, onVinWatchChange }) => {
    const renderVins = () => {
        return vins.map((vin, key) =>
            <CheckBox
                key={key}
                checked={vin.isWatching}
                onChange={() => onVinWatchChange(key)}
            >
                {vin.vin}
            </CheckBox>
        )
    }
    return (
        <div className="vin-list">
            {renderVins()}
        </div>
    )
}

export default VinList