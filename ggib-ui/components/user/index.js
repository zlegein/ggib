import React from 'react'
import { useGetUser } from '../../hooks'
import { useRouter } from 'next/router';

export const User = () => {
  const { query: { userId } } = useRouter()
  const { data, isLoading } = useGetUser(userId)
  console.log(data, isLoading);
  if( isLoading) {
    return null
  }
  return (
    <pre>{JSON.stringify(data, 2, null)}</pre>
  )
}