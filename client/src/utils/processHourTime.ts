import {DateTime} from 'luxon'

const processHourTime = (hourISO: string): string => {
    console.log(hourISO)
    const dt = DateTime.fromISO(hourISO, {setZone: true})
    console.log(dt)
    return dt.toFormat("h a")
}

export default processHourTime