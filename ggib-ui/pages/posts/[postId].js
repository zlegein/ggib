import React from 'react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout, Header, Post } from '../../components'
import { fetchPost } from '../../hooks'

const PostPage = () => {
  return (
    <Layout>
      <Header />
      <Post/>
    </Layout>
  )
}

/**
 * Prefeches the user information on the server.
 * @see https://tanstack.com/query/v4/docs/guides/ssr#using-hydration 
 */
export async function getServerSideProps({ params }) {  
  console.log('PARAMS', params)
  const { postId } = params 
  if (!postId) {
    return {
      notFound: true
    }
  }
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['post', postId], () => fetchPost(postId))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default PostPage;