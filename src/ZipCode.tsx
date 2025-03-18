import React, { useState } from 'react'


interface ZipCodeProps {
    zipCode: string,
    setZipCode: (zip: string) => void,
    fetchWeather: (zip: string) => void,
}

const ZipCode = (props: ZipCodeProps) => {
    const {zipCode, setZipCode, fetchWeather} = props
    const [localZip, setLocalZip] = useState(zipCode)

    const submitZipCode = () => {
        if (localZip.trim().length === 5) {
            setZipCode(localZip)
            fetchWeather(localZip)
        } else {
            alert("Please enter a valid zip code")
        }
    }

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