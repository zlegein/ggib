import React from 'react'
import { useGetPost } from '../../hooks'
import { useRouter } from 'next/router';

export const Post = () => {
  const { query: { postId } } = useRouter()
  const { data, isLoading } = useGetPost(postId)
  console.log('ARE WE GETTING', data, isLoading);
  if( isLoading) {
    return null
  }
  return (
    <>
      <pre>{JSON.stringify(data, 2, null)}</pre>
    </>
  )
}