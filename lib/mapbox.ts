import { env } from "@/lib/env"

export const getMapboxStaticImage = (longitude: number, latitude: number, zoom = 14, width = 600, height = 400) => {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(${longitude},${latitude})/${longitude},${latitude},${zoom},0/${width}x${height}?access_token=${env.MAPBOX_ACCESS_TOKEN}`
}

export const getMapboxDirectionsUrl = (
  startLongitude: number,
  startLatitude: number,
  endLongitude: number,
  endLatitude: number,
) => {
  return `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${endLongitude},${endLatitude}?access_token=${env.MAPBOX_ACCESS_TOKEN}`
}

