'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Gift, ChevronRight, Clock } from 'lucide-react'

const Map = dynamic(() => import('@/components/map'), { ssr: false })

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Destination {
  id: string
  arrival: number
  departure: number
  population: number
  presentsDelivered: number
  city: string
  region: string
  location: {
    lat: number
    lng: number
  }
  details: {
    timezone: number
    photos: {
      url: string
      attributionHtml: string
      lg: boolean
    }[]
  }
}

interface SantaData {
  destinations: Destination[]
}

export default function SantaTracker() {
  const [center, setCenter] = useState<[number, number]>([84.6, 168])
  const [zoom, setZoom] = useState(2)

  const { data, error, isLoading } = useSWR<SantaData>(
    'https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b',
    fetcher
  )

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const destinations = data?.destinations.map(destination => {
    const arrivalDate = new Date(destination.arrival)
    const departureDate = new Date(destination.departure)
    arrivalDate.setFullYear(currentYear)
    departureDate.setFullYear(currentYear)
    return {
      ...destination,
      arrival: arrivalDate.getTime(),
      departure: departureDate.getTime(),
    }
  }) || []

  const currentLocation = destinations.find(destination => 
    currentDate.getTime() >= destination.arrival && currentDate.getTime() <= destination.departure
  )

  useEffect(() => {
    if (currentLocation) {
      setCenter([currentLocation.location.lat, currentLocation.location.lng])
      setZoom(4)
    }
  }, [currentLocation])

  if (error) return <div>Failed to load Santa&apos;s route</div>

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader className="bg-red-600 text-white">
        <CardTitle className="text-3xl font-bold">Santa Tracker</CardTitle>
        <CardDescription className="text-white/80">Follow Santa&apos;s magical journey around the world!</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <Skeleton className="h-[400px] w-full rounded-md" />
        ) : (
          <div className="space-y-6">
            {currentLocation && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-2xl font-bold text-red-800 flex items-center">
                  <MapPin className="mr-2" size={24} />
                  Santa is in {currentLocation.city}, {currentLocation.region}!
                </h3>
                <p className="text-red-700 mt-2 flex items-center">
                  <Clock className="mr-2" size={16} />
                  As of: {new Date().toLocaleTimeString()}
                </p>
                <p className="text-red-600 mt-1 flex items-center">
                  <Gift className="mr-2" size={16} />
                  Presents delivered: {currentLocation.presentsDelivered.toLocaleString()}
                </p>
              </div>
            )}
            <Map center={center} zoom={zoom} className="h-[400px] rounded-md shadow-md" destinations={destinations} currentDate={currentDate} />
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (currentLocation) {
                  setCenter([currentLocation.location.lat, currentLocation.location.lng])
                  setZoom(8)
                }
              }}
            >
              Zoom to Santa&apos;s Location
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

