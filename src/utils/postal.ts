// This module calculates the nearest postal code / city / province based on location

// Libraries for better-than brute force search over a set of geographical points
import geokdbush from 'geokdbush'
import Kdbush from 'kdbush'

// Used http://download.geonames.org/export/zip/FI.zip and removed a few very obvious errors in the data
// We may be able to get a better data source
// Original data in the zip is a TSV that was transformed using a simple data.split("\n").map(row => row.split("\t")) etc.

export interface LocationInfo {
  postalCode: string
  city: string
  lat: number
  lng: number
}

// We may also want to minimize this JSON data if it is to be used
const postalToCoords: Record<
  string,
  LocationInfo
> = require('./postalCodeToLocationInfo.json')

const POINT_INDEX = new Kdbush(
  Object.values(postalToCoords),
  (p: LocationInfo) => p.lng,
  (p: LocationInfo) => p.lat
)

export function getKNearestLocations(
  userLat: number,
  userLng: number,
  kNearest: number = 1
): LocationInfo[] {
  return geokdbush.around(POINT_INDEX, userLng, userLat, kNearest)
}
