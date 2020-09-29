import React, {useState, useEffect} from 'react';
import './App.css';
import Info from './Info'

function App() {
  const [ip, setIp] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [data, setData] = useState(undefined)
  const fetchData = (x) => {
    const httpReq = new XMLHttpRequest();
    httpReq.open('GET', `https://geo.ipify.org/api/v1?apiKey=at_c0on2V05qr6GryTW7Zo7aijQyxy8J&domain=${x}&ipAddress=${x}`, 0)
    httpReq.send(null)
    setData(JSON.parse(httpReq.responseText))
    !JSON.parse(httpReq.responseText).ip && alert('Enter a valid IP/Domain Address')
  }
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    setData(fetchData(ip))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => fetchData(''), [])

  return (
    <div className="app">
      <div className="app_header">
        <h1>IP Address Tracker</h1>
        <div className="search_bar">
          <input type="text"
            placeholder={width >= 492 ? "Search for any IP address or domain" : width >= 322 ? "Search IP/Domain" : "Search"}
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <button tpye='submit' onClick={() => fetchData(ip)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#fff" stroke-width="3" d="M2 1l6 6-6 6" /></svg>
          </button>
        </div>
        <Info data={data} />
      </div>
    </div>
  );
}

export default App;
