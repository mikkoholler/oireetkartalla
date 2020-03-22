import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import { GeolocationState } from './useGeolocation'

const useStyles = makeStyles((theme) => ({
  geoLocationButton: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export const GeolocationButton: React.FC<{
  state: GeolocationState
  position: Position | null
  getCurrentLocation: () => void
}> = ({ state, position, getCurrentLocation }) => {
  const classes = useStyles()

  let icon = <LocationDisabledIcon />

  if (state.status === 'supported' && !state.locatingFailed) {
    if (position === null) {
      icon = <MyLocationIcon />
    } else {
      icon = <GpsFixedIcon />
    }
  } else if (state.status === 'locating') {
    icon = <LocationSearchingIcon />
  }

  return (
    <Fab
      className={classes.geoLocationButton}
      onClick={getCurrentLocation}
      disabled={state.status === 'disabled' || state.status === 'unsupported'}
    >
      {icon}
    </Fab>
  )
}
