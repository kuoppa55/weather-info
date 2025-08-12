import {DateTime} from 'luxon'

const processHourTime = (hourISO: string): string => {
    const dt = DateTime.fromISO(hourISO, {setZone: true})
    const formatted = dt.toFormat("h a")
    return formatted.length === 4 ? `${formatted} ` : formatted
}

export default processHourTime