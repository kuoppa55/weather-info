import React from 'react'
import './Alert.css'
import { IAlert } from '../../types/types'
import processHourTime from '../../utils/processHourTime'
import { ALERT_COLORS } from '../../types/alertColors'

interface AlertProps {
    alert: IAlert
}
const Alert = (props: AlertProps) => {
    const {alert} = props

    const hex = ALERT_COLORS[alert.event.replace(/\s+/g, '')] ?? '#ccc'
    const backgroundHex = hex + '33'

  return (
    <div className='alert' style={{'--alert-color': hex, '--alert-bg': backgroundHex} as React.CSSProperties}>
        <div className='alertEvent'>
            {alert.event}
        </div>
        <div className='alertEffectiveTime'>
            Effective: {processHourTime(alert.effective)}
        </div>
        <div className='alertExpiresTime'>
            Expires: {processHourTime(alert.expires)}
        </div>
        <div className='alertDescription'>
            
        </div>
    </div>
  )
}

export default Alert