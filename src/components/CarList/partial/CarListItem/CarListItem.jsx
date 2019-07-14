import React from 'react';
import ProgressBar from '../../../ProgressBar/ProgressBar';
import './styles.scss'

const CarListItem = ({ vin }) => {

    const renderLoading = () => (
        <div className="loading">
            <img src={require('../../../../assets/gifs/loading.gif')} height="80" alt=""/>
        </div>
    )

    const renderDetails = () => (
        <>
            <div className="car-data">
                <div className="detail">
                    <i className="fas fa-gas-pump"></i>
                    <div className="t-sm t-bold">Fuel level</div>
                    <div className="t-sm">{Math.floor(carData.fuel * 100)}%</div>
                    <ProgressBar percent={carData.fuel * 100} />
                </div>
                <div className="detail">
                    <i className="fas fa-tint"></i>
                    <div className="t-sm t-bold">Wiper fluid</div>
                    <div className="t-sm">{Math.floor(carData.wiperFluid * 100)}%</div>
                    <ProgressBar percent={carData.wiperFluid * 100} />
                </div>
            </div>
            <div className="location">
                <i className="fas fa-car-side" style={{
                    position: 'absolute',
                    transition: 'all 5000ms',
                    top: `${carData.location.lat}%`,
                    left: `${carData.location.lng}%`,
                }}></i>
            </div>
        </>
    )


    const { carData } = vin
    return (
        <div className="car-list-item animated fadeIn">
            <div className="header">
                <i className="fas fa-car-side"></i>
                <span>VIN:</span>
                <span className="t-bold">{vin.vin}</span>
            </div>
            <div className="content">
                {carData ? renderDetails() : renderLoading()}
            </div>
        </div>
    )
}

export default CarListItem