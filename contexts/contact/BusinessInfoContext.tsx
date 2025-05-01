// contexts/BusinessInfoContext.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type BusinessInfo = {
  hoursWeekdays: string
  hoursSaturday: string
  hoursSunday: string
  holidayHours: string
  emergencyServices: string
  locationName: string
  locationCity: string
  locationLat?: number
  locationLng?: number
}

type BusinessContextType = {
  data: BusinessInfo | null
  refresh: () => Promise<void>
  setData: (info: BusinessInfo) => void
}

const BusinessInfoContext = createContext<BusinessContextType | null>(null)

export const useBusinessInfo = () => {
  const ctx = useContext(BusinessInfoContext)
  if (!ctx) throw new Error('useBusinessInfo must be used within BusinessInfoProvider')
  return ctx
}

export const BusinessInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<BusinessInfo | null>(null)

  const refresh = async () => {
    const res = await fetch('/api/business-info')
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <BusinessInfoContext.Provider value={{ data, refresh, setData }}>
      {children}
    </BusinessInfoContext.Provider>
  )
}
