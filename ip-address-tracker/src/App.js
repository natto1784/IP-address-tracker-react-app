import React, {useState, useEffect} from 'react';
import './App.css';
import Info from './Info'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet'
function App() {
  const [ip, setIp] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [data, setData] = useState(undefined)
  const [location, setLocation] = useState([0, 0])
  const [textLocation, setTextLocation] = useState(['-', '-', '-'])
  const fetchData = (x) => {
    const httpReq = new XMLHttpRequest();
    httpReq.open('GET', `https://geo.ipify.org/api/v1?apiKey=at_c0on2V05qr6GryTW7Zo7aijQyxy8J&domain=${x}&ipAddress=${x}`, 0)
    httpReq.send(null)
    const bruh = JSON.parse(httpReq.responseText)
    setData(bruh)
    !bruh.ip && alert('Enter a valid IP/Domain Address')
    bruh.ip ? setLocation([bruh.location.lat, bruh.location.lng]) : setLocation([0, 0])
    bruh.ip ? setTextLocation([bruh.location.city, bruh.location.region, bruh.location.country]) : setTextLocation(['-', '-', '-'])
  }
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => fetchData(''), [])
  const myicon = L.icon({
    iconUrl: require('./images/icon-location.svg'),
    iconSize: [50, 64],
    iconAnchor: [32, 64],
    popupAnchor: [-6, -68]
  })
  return (
    <div className="app">
      <div className="app_header">
        <h1>IP Address Tracker</h1>
        <div className="search_bar">
          <input type="text"
            placeholder={width >= 492 ? "Search for any IP address or domain" : width >= 322 ? "Search IP/Domain" : "Search"}
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter')
                fetchData(ip)
            }}
          />
          <button tpye='submit' onClick={() => fetchData(ip)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#fff" strokeWidth="3" d="M2 1l6 6-6 6" /></svg>
          </button>
        </div>
        <Info data={data} />
      </div>
      <Map center={location} zoom='15' className='map'>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location} icon={myicon}>
          <Popup>
            {textLocation[0]}<br />
            {textLocation[1]}<br />
            {textLocation[2]}
          </Popup>
        </Marker>
      </Map>
    </div >
  );
}

export default App;
