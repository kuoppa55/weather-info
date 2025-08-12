import {DateTime} from 'luxon'

const processAlertTimes = (hourISO: string): string => {
    const dt = DateTime.fromISO(hourISO, {setZone: true})
    return dt.toFormat("MMMM d, h a")
}

export default processAlertTimes