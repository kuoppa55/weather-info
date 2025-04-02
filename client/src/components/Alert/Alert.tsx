import React from 'react'
import './Alert.css'
import { IAlert } from '../../types/types'

interface AlertProps {
    alert: IAlert
}
const Alert = (props: AlertProps) => {
    const {alert} = props
  return (
    <div className='alert'>
        <div className='alertEvent'>
            {alert.event}
        </div>
        <div className='alertEffectiveTime'>
            Effective: {alert.effective}
        </div>
        <div className='alertExpiresTime'>
            Expires: {alert.expires}
        </div>
        <div className='alertDescription'>
            Coordinates: {alert.coordinates}
        </div>
    </div>
  )
}

export default Alert