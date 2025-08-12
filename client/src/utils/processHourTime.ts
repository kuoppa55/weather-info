import {DateTime} from 'luxon'

const processHourTime = (hourISO: string): string => {
    const dt = DateTime.fromISO(hourISO, {setZone: true})
    const formatted = dt.toFormat("h a")
    // formatted is in format "h a" (ex: 10 AM)
    // if the hour is one digit, add extra space after AM/PM
    // dt is 24 hour time
    return formatted.length === 4 ? `${formatted} ` : formatted
}

export default processHourTime