import React, { useEffect, useRef } from 'react'
import './WeatherMap.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import BaseLayer from 'ol/layer/Base'
import {fromLonLat} from 'ol/proj'
import {Fill, Stroke, Style} from 'ol/style'
import 'ol/ol.css'

interface WeatherMapProps {
    latitude: number,
    longitude: number,
    polygonCoordsList?: [number, number][][]
}

const WeatherMap = (props: WeatherMapProps) => {
    const {latitude, longitude, polygonCoordsList} = props
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mapRef.current) return

        const baseLayers: BaseLayer[] = [
            new TileLayer({
                source: new OSM(),
            }),
        ]

        if(polygonCoordsList && polygonCoordsList.length > 0) {
            const features = polygonCoordsList.map(coords => {
                const projected = coords.map(coord => fromLonLat(coord))
                const polygon = new Polygon([projected])
                return new Feature({geometry: polygon})
            })

            features.forEach(f => 
                f.setStyle(
                    new Style({
                        stroke: new Stroke({ color: 'blue', width: 2 }),
                        fill: new Fill({ color: 'rgba(0, 0, 255, 0.2)' }),
                    })
                )
            )

            const vectorLayer = new VectorLayer({
                source: new VectorSource({features}),
            })

            baseLayers.push(vectorLayer)

        }
        const map = new Map({
            target: mapRef.current,
            layers: baseLayers,
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