import React from 'react'
import './Header.css'
import { ZipCodeProps } from '../../types/types'
import ZipCode from '../ZipCode/ZipCode'

interface headerProps {
    zipCodeProps: ZipCodeProps
}
const Header = (props: headerProps) => {
    const {zipCodeProps} = props
  return (
    <div className="header">
        <h1 className="headerTitle">Simply Weather</h1>
        <ZipCode {...zipCodeProps}/>
    </div>
  )
}

export default Header