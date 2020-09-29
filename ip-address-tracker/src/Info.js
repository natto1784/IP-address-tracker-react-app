import React from 'react'
import './Info.css'

export default function Info(props) {
  const data = props.data ? props.data : {}
  return (
    <div className='info'>
      <div className='section'>
        <span className="title">
          IP ADDRESS
        </span>
        <span className="value">
          {data.ip ? data.ip : '-'}
        </span>
      </div>
      <div className='section'>
        <div className='vr' />
        <span className="title">
          LOCATION
        </span>
        <span className="value">
          {data.location ? `${data.location.city}, ${data.location.region}, ${data.location.country}` : '-'}
        </span>
      </div>
      <div className='section'>
        <div className='vr' />
        <span className="title">
          TIMEZONE
        </span>
        <span className="value">
          {data.location ? data.location.timezone ? `UTC${data.location.timezone}` : '-' : '-'}
        </span>
      </div>
      <div className='section'>
        <div className='vr' />
        <span className="title">
          ISP
        </span>
        <span className="value">
          {data.isp ? data.isp : '-'}
        </span>
      </div>
    </div>
  )
}
