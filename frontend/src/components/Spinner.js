import React from 'react'
import './Spinner.css'

const Spinner = () => (
<div 
    style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="lds-dual-ring"></div>
</div>)

export default Spinner