import React from 'react';
import CarListItem from './partial/CarListItem/CarListItem';
import './styles.scss'
import Checkbox from '../Checkbox';
import { useState } from 'react'
const CarList = ({ vins }) => {
    const [isFiltered, setIsFiltered] = useState(false)

    const filterByActives = () => vins.filter(vin => vin.isWatching)
    const filterByFuel = () => filterByActives().filter(vin => (vin.carData && vin.carData.fuel < 0.15))
    const filteredVins = () => isFiltered ? filterByFuel() : filterByActives();

    const renderCars = () => {
        if (!vins.length) return 'No cars added.'
        return filteredVins().map((vin, key) => (
            <CarListItem key={key} vin={vin} />
        ))
    }

    return (
        <div className="car-list">
            <div className="header">
                <Checkbox checked={isFiltered} onChange={() => setIsFiltered(!isFiltered)}>
                    Filter Events where fuel level is under 15%
                </Checkbox>
            </div>
            <div className="list">
                {renderCars()}
            </div>
        </div>
    )
}

export default CarList