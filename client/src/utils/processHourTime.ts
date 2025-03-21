import {DateTime} from 'luxon'

const processHourTime = (hourISO: string): string => {

    const dt = DateTime.fromISO(hourISO)
    console.log(dt.toFormat("h a"))
    return dt.toFormat("h a")
}

export default processHourTime