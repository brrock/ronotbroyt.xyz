'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

interface MapProps {
  center: [number, number]
  zoom: number
  className?: string
  destinations: any[]
  currentDate: Date
}

const Map = ({ center, zoom, className, destinations, currentDate }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(center, zoom)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom)
    }
  }, [center, zoom])

  useEffect(() => {
    if (!markersLayerRef.current) return

    markersLayerRef.current.clearLayers()

    destinations.forEach((destination) => {
      const { id, arrival, departure, location, city, region, presentsDelivered } = destination
      const arrivalDate = new Date(arrival)
      const departureDate = new Date(departure)
      const santaWasHere = currentDate.getTime() - departureDate.getTime() > 0
      const santaIsHere = currentDate.getTime() - arrivalDate.getTime() > 0 && !santaWasHere

      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="w-6 h-6 rounded-full border-2 border-white shadow-lg ${
          santaIsHere ? 'bg-red-500' : santaWasHere ? 'bg-green-500' : 'bg-blue-500'
        }"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })

      const marker = L.marker([location.lat, location.lng], { icon })

      marker.bindPopup(`
        <div class="text-sm">
          <p class="font-bold">${city}, ${region}</p>
          <p>Arrival: ${arrivalDate.toLocaleString()}</p>
          <p>Departure: ${departureDate.toLocaleString()}</p>
          <p>Presents: ${presentsDelivered.toLocaleString()}</p>
        </div>
      `)

      markersLayerRef.current?.addLayer(marker)
    })
  }, [destinations, currentDate])

  return (
    <div id="map" className={`${className} rounded-lg overflow-hidden`} />
  )
}

export default Map

