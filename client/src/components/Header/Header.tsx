import React from 'react'
import './Header.css'
import { ZipCodeProps } from '../../types/types'
import ZipCode from '../ZipCode/ZipCode'

interface headerProps {
    zipCodeProps: ZipCodeProps
    onClick: (event: React.MouseEvent<HTMLHeadingElement>) => void
}
const Header = (props: headerProps) => {
    const {zipCodeProps, onClick} = props
  return (
    <div className="header">
        <h1 className="headerTitle" onClick={onClick} style={{ cursor: 'pointer' }}>Simply Weather</h1>
        <ZipCode {...zipCodeProps}/>
    </div>
  )
}

export default Header