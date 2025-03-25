import React, { useEffect, useState } from 'react'
import "./ZipCode.css"

interface ZipCodeProps {
    zipCode: string,
    setZipCode: (zip: string) => void,
    fetchWeather: (zip: string, lat: number, lon: number) => void,
}

const ZipCode = (props: ZipCodeProps) => {
    const {zipCode, setZipCode, fetchWeather} = props
    const [localZip, setLocalZip] = useState(zipCode)

    const submitZipCode = () => {
        if (localZip.trim().length === 5) {
            setZipCode(localZip)
            fetchWeather(localZip, -1, -1)
        } else {
            alert("Please enter a valid zip code")
        }
    }

    useEffect(() => {
        if(localZip !== null) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchWeather("", position.coords.latitude, position.coords.longitude)
                    }
                )
            }
        }
    }, [])

    return (
    <div className="zipCodeComponent">
        <input 
            type="text" 
            value={localZip} 
            onChange={(e) => setLocalZip(e.target.value)} 
            placeholder="Enter zip code..."
            maxLength={5}
        />
        <button
            onClick={submitZipCode} 
        >
            Get Weather
        </button>
    </div>
    )
}

export default ZipCode