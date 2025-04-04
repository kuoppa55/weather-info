import {DateTime} from 'luxon'

const processHourTime = (hourISO: string): string => {
    const dt = DateTime.fromISO(hourISO, {setZone: true})
    return dt.toFormat("h a")
}

export default processHourTime