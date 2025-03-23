import { TimeOfDay } from "../types/types"

const getTimeOfDay = (): TimeOfDay => {
    const now = new Date()
    const hour = now.getHours()

    if(hour < 6) {
        return TimeOfDay.EarlyMorning
    } else if (hour < 18) {
        return TimeOfDay.Day
    } else {
        return TimeOfDay.Night
    }
}

export default getTimeOfDay