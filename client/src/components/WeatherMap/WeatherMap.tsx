import React, { useEffect, useRef } from 'react'
import './WeatherMap.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {fromLonLat} from 'ol/proj'
import 'ol/ol.css'

interface WeatherMapProps {
    latitude: number,
    longitude: number,
}

const WeatherMap = (props: WeatherMapProps) => {
    const {latitude, longitude} = props
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mapRef.current) return

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([longitude, latitude]),
                zoom: 10,
            }),
        })

        return () => map.setTarget(undefined)
    })

    return (
        <div ref={mapRef} className='weatherMap'/>
    )
}

export default WeatherMap