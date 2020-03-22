import React, { useState, useEffect } from 'react'
import './App.css'
import GoogleMapReact from 'google-map-react'
import { SymptomsMenu } from './components/Symptoms/SymptomsMenu'
import styled from 'styled-components'
import firebase from 'firebase'
import { getKNearestLocations, LocationInfo } from './utils/postal'
import { useGeolocation } from './useGeolocation'
import { GeolocationButton } from './GeolocationButton'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

firebase.initializeApp(firebaseConfig)

function App() {
  const [mapCoordinates, setMapCoordinates] = useState({
    lat: 66.052978,
    lng: 26.18439,
  })
  const [zoomLevel] = useState(5.25)
  const [, setLocationSuggestions] = useState<
    LocationInfo[]
  >([])

  const [geolocationState, position, getCurrentLocation] = useGeolocation()

  useEffect(() => {
    if (position) {
      setMapCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      setLocationSuggestions(getKNearestLocations(position.coords.latitude, position.coords.longitude, 5))
    }
  }, [position])

  const [showSymptomsMenu, toggleSymptomsMenu] = useState<boolean>(false)

  const onClick = () => toggleSymptomsMenu(!showSymptomsMenu)

  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      {showSymptomsMenu && <SymptomsMenu closeSymptomsMenu={onClick} />}
      <Navi>
        <div onClick={() => onClick()}>Omat oireeni</div>
      </Navi>

      <GoogleMapReact
        options={{ fullscreenControl: false }}
        bootstrapURLKeys={{ key: 'AIzaSyAebNmxEjr0MHqmQdbRAxSPpUF4n3UGwRw' }}
        zoom={zoomLevel}
        center={mapCoordinates}
      />
      <GeolocationButton
        state={geolocationState}
        position={position}
        getCurrentLocation={getCurrentLocation}
      />
    </div>
  )
}

const Navi = styled.div`
  display: flex;
  bottom: 0;
  position: absolute;
  z-index: 1;

  & > div {
    padding: 1rem;
    margin: 1rem;
    text-align: center;
    box-sizing: border-box;
    border-radius: 10px;
    background: hsla(0, 0%, 100%, 0.9);
    font-family: 'Roboto';
    text-transform: uppercase;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  }
`

export default App
