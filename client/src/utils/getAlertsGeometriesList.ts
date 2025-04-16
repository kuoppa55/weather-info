import { Geometry, IAlert } from "../types/types"


const getAlertsGeometriesList= (alerts: IAlert[]): [Geometry, string ][] => {
    const geometriesList: [Geometry, string][] = []

    alerts.forEach( a => {
        if (a.geometry) {
            geometriesList.push([a.geometry, a.event.replace(/\s+/g, '')])
        }
    }
    )

    return geometriesList
}

export default getAlertsGeometriesList