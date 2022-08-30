import React from 'react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout, Header, InfoBox, PostList } from '../components'
import { fetchPosts } from '../hooks'

const Posts = () => {
  return (
    <Layout>
      <Header />
      <PostList />
    </Layout>
  )
}

/**
 * Prefetches the first 10 posts on the server.
 * @see https://tanstack.com/query/v4/docs/guides/ssr#using-hydration 
 */
export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts', 10], () => fetchPosts(10))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Posts