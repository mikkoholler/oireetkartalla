import { useState, useEffect, useCallback } from 'react'

export type GeolocationState =
  | { status: 'unsupported' }
  | { status: 'disabled' }
  | {
      status: 'supported'
      promptRequired: boolean
      locatingFailed: boolean
    }
  | { status: 'locating' }

export type GeolocationData = [GeolocationState, Position | null, () => void]

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError#Properties
const GEOLOCATION_PERMISSION_DENIED = 1

export function useGeolocation(): GeolocationData {
  const [state, setState] = useState<GeolocationState>({ status: 'disabled' })
  const [position, setPosition] = useState<Position | null>(null)

  const { status: currentStatus } = state

  const getCoordinates = useCallback(() => {
    if (currentStatus === 'supported') {
      setState({ status: 'locating' })

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position)
          setState({
            status: 'supported',
            promptRequired: false,
            locatingFailed: false,
          })
        },
        (error) => {
          setPosition(null)
          if (error.code === GEOLOCATION_PERMISSION_DENIED) {
            setState({ status: 'disabled' })
          } else {
            setState({
              status: 'supported',
              promptRequired: false,
              locatingFailed: true,
            })
          }
        },
        {
          enableHighAccuracy: true,
        }
      )
    }
  }, [currentStatus])

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setState(permissionStateToGeolocationState(result.state))

        result.onchange = () => {
          setState(permissionStateToGeolocationState(result.state))
        }
      })
    } else {
      setState({ status: 'unsupported' })
    }
  }, [])

  return [state, position, getCoordinates]
}

function permissionStateToGeolocationState(
  pState: PermissionState
): GeolocationState {
  switch (pState) {
    case 'denied':
      return { status: 'disabled' }
    case 'prompt':
      return {
        status: 'supported',
        promptRequired: true,
        locatingFailed: false,
      }
    case 'granted':
      return {
        status: 'supported',
        promptRequired: true,
        locatingFailed: false,
      }
  }
}
