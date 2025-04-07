import { IAlert } from "../types/types"


const getAlertsCoordinateList= (alerts: IAlert[]): [[number, number][], string ][] => {
    const coordinateList: [[number, number][], string ][] = []

    alerts.forEach( a => {
        if (a.coordinates) {
            coordinateList.push([a.coordinates, a.event.replace(/\s+/g, '')])
        }
    }
    )

    return coordinateList
}

export default getAlertsCoordinateList