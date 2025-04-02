import { IAlert } from "../types/types"


const getAlertsCoordinateList= (alerts: IAlert[]): [number, number][][] => {
    const coordinateList: [number, number][][] = []

    alerts.forEach( a => {
        if (a.coordinates) {
            coordinateList.push(a.coordinates)
        }
    }
    )

    return coordinateList
}

export default getAlertsCoordinateList