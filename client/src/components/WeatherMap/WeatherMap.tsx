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
import LayerGroup from 'ol/layer/Group'
import Control from 'ol/control/Control'
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

    useEffect(() => {
        if (!mapRef.current) return

        //base
        const baseLayers: BaseLayer[] = [
            new TileLayer({
                source: new OSM(),
            }),
        ]

        //radar tiles
        const radarLayers: TileLayer<XYZ>[] = radarTimestamps.map((timestamp, index) =>
            new TileLayer({
                source: new XYZ({
                    url: `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/5/0_0.png`,
                    crossOrigin: 'anonymous',
                }),
                visible: index === radarTimestamps.length - 1, // Only show the latest radar layer by default
                opacity: 0.7,
            })
        )

        const radarGroup = new LayerGroup({layers: radarLayers, visible: true})
        baseLayers.push(radarGroup);

        //alerts

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

        const container = document.createElement('div')
        container.className = 'ol-unselectable ol-control ol-radar-toggle'

        const radarBtn = document.createElement('button')
        radarBtn.title = "Toggle radar"
        radarBtn.textContent = 'Radar'
        if (!radarGroup.getVisible()) radarBtn.classList.add('is-off')

        const animBtn = document.createElement('button')
        animBtn.title = "Animate radar"
        animBtn.textContent = 'Animate'
        animBtn.style.display = 'none'

        container.appendChild(radarBtn)
        container.appendChild(animBtn)
        map.addControl(new Control({ element: container }))

        let frameIndex = 0;
        const totalFrames = radarLayers.length;
        let animId: number | null = null;

        const showFrame = (idx: number) => {
            radarLayers.forEach((layer, i) => layer.setVisible(i === idx));
        }

        const tick = () => {
            showFrame(frameIndex);
            frameIndex = (frameIndex + 1) % totalFrames;
        }

        const startAnim = () => {
            if (animId !== null || totalFrames <= 1) return;
            animId = window.setInterval(tick, 500);
            animBtn.classList.add('is-on')
            animBtn.textContent = 'Pause'
        }

        const stopAnim = () => {
            if (animId === null) return;
            window.clearInterval(animId);
            animId = null;
            animBtn.classList.remove('is-on');
            animBtn.textContent = 'Animate';
        }

        const updateAnimBtnVisibility = () => {
            const visible = radarGroup.getVisible() && totalFrames > 1;
            animBtn.style.display = visible ? 'inline-block' : 'none';
            if (!visible) stopAnim();
        }

        updateAnimBtnVisibility();

        radarBtn.onclick = (e) => {
            e.preventDefault();
            const v = !radarGroup.getVisible();
            radarGroup.setVisible(v);
            radarBtn.classList.toggle('is-off', !v);
            updateAnimBtnVisibility();
        }

        animBtn.onclick = (e) => {
            e.preventDefault();
            if (animId === null) startAnim();
            else stopAnim();
        }

        return () => {
            if (animId !== null) window.clearInterval(animId);
            map.setTarget(undefined)
        }
    })

    return (
        <div ref={mapRef} className='weatherMap'/>
    )
}

export default WeatherMap