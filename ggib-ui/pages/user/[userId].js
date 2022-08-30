import React from 'react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Layout, Header, User, PostList } from '../../components'
import { fetchUser } from '../../hooks'

const UserPage = () => {
  return (
    <Layout>
      <Header />
      <User/>
    </Layout>
  )
}

/**
 * Prefeches the user information on the server.
 * @see https://tanstack.com/query/v4/docs/guides/ssr#using-hydration 
 */
export async function getServerSideProps({ params }) {  
  const { userId } = params 
  if (!userId) {
    return {
      notFound: true
    }
  }
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['user', userId], () => fetchUser(userId))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default UserPage