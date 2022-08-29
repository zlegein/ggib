import React from 'react'
import { useHello } from '../../hooks'

export const Welcome = () => {
  const { data, isLoading } = useHello()
  if( isLoading) {
    return null
  }
  return (
    <pre>{JSON.stringify(data, 2, null)}</pre>
  )
}