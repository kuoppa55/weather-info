import React from 'react'
import './Alerts.css'
import { IAlert } from '../../types/types'
import Alert from '../Alert/Alert'

interface AlertsProps {
    alerts: IAlert[]
}
const Alerts = (props: AlertsProps) => {
    const {alerts} = props
  return (
    <div className='alerts'>
        {alerts.map((alert) => (
            <Alert alert={alert}/>
        ))}
    </div>
  )
}

export default Alerts