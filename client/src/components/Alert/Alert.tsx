import React, { useState } from 'react'
import './Alert.css'
import { IAlert } from '../../types/types'
import { ALERT_COLORS } from '../../types/alertColors'
import processAlertTimes from '../../utils/processAlertTimes'

interface AlertProps {
    alert: IAlert
}

const Alert = (props: AlertProps) => {
    const {alert} = props
    const [showModal, setShowModal] = useState(false)
    
    const hex = ALERT_COLORS[alert.event.replace(/\s+/g, '')] ?? '#ccc'
    const backgroundHex = hex + '33'

    return (
        <>
            <div className='alert' style={{'--alert-color': hex, '--alert-bg': backgroundHex} as React.CSSProperties}>
                <div className='alertEvent'>
                    {alert.event}
                </div>
                <div className='alertTimes'>
                    <div className='alertEffectiveTime'>
                        Effective: {processAlertTimes(alert.effective)}
                    </div>
                    <div className='alertExpiresTime'>
                        Expires: {processAlertTimes(alert.expires)}
                    </div>
                </div>
                <button 
                    className='alertDetailsButton'
                    onClick={() => setShowModal(true)}
                >
                    View Details
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} 
                         style={{'--modal-color': hex} as React.CSSProperties}>
                        <h3>{alert.event}</h3>
                        <div className="modal-times">
                            <div>Effective: {processAlertTimes(alert.effective)}</div>
                            <div>Expires: {processAlertTimes(alert.expires)}</div>
                        </div>
                        <div className="modal-description">{alert.description}</div>
                        <button className="modal-close" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Alert