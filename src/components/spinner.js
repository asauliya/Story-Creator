import React from 'react'
import spinner from '../Spinner.gif'
function Spinner() {
  return (
    <div className='text-center'>
        <img src={spinner} style={{height:"80px"}} alt="loading" />
    </div>
  )
}

export default Spinner;