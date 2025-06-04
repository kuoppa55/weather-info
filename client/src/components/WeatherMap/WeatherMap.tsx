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
import { ALERT_COLORS } from '../../types/alertColors'
import { Geometry } from '../../types/types'
import { MultiPolygon } from 'ol/geom'
import { XYZ } from 'ol/source'

interface WeatherMapProps {
    latitude: number,
    longitude: number,
    geometriesList?: [geometry: Geometry, alertType: string][]
    radarTimestamps: number[]
}

const WeatherMap = (props: WeatherMapProps) => {
    const {latitude, longitude, geometriesList, radarTimestamps} = props
    const mapRef = useRef<HTMLDivElement>(null)

    const radarLayers: TileLayer<XYZ>[] = radarTimestamps.map((timestamp, index) => {
        return new TileLayer({
            source: new XYZ({
                url: `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/5/0_0.png`,
                crossOrigin: 'anonymous',
            }),
            visible: index === radarTimestamps.length - 1, // Only show the latest radar layer by default
            opacity: 0.7,
        });
    });

    useEffect(() => {
        if (!mapRef.current) return

        const baseLayers: BaseLayer[] = [
            new TileLayer({
                source: new OSM(),
            }),
        ]
        
        radarLayers.forEach(layer => baseLayers.push(layer));

        if(geometriesList && geometriesList.length > 0) {
            const features = geometriesList.map(([geometry, alertType]) => {
                let olGeometry

                if(geometry.type === "Polygon") {
                    const projected = geometry.coordinates.map(ring =>
                        ring.map(coord => fromLonLat(coord))
                    )
                    olGeometry = new Polygon(projected);
                } else if (geometry.type === "MultiPolygon") {
                    const projected = geometry.coordinates.map(polygon =>
                        polygon.map(ring =>
                            ring.map(coord => fromLonLat(coord))
                        )
                    )
                    olGeometry = new MultiPolygon(projected)
                } else {
                    console.warn(`Unsupported geometry type`)
                    return null
                }

                console.log(olGeometry)
                
                const feature = new Feature({geometry: olGeometry})

                const hex = ALERT_COLORS[alertType]
                const fillHex = hex + '55'

                feature.setStyle(
                    new Style({
                        stroke: new Stroke({ 
                            color: hex, 
                            width: 3,
                        }),
                        fill: new Fill({color: fillHex})
                    })
                )

                return feature
            }).filter((f): f is Feature<Polygon | MultiPolygon> => f !== null)


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

        let frameIndex = 0;
        const totalFrames = radarLayers.length;

        const animateRadar = () => {
            radarLayers.forEach((layer, index) => {
                layer.setVisible(index === frameIndex);
            });
            frameIndex = (frameIndex + 1) % totalFrames;
        };

        //const animationInterval = setInterval(animateRadar, 500); // Change frame every second

        return () => {
            //clearInterval(animationInterval)
            map.setTarget(undefined)
        }
    })

    return (
        <div ref={mapRef} className='weatherMap'/>
    )
}

export default WeatherMap