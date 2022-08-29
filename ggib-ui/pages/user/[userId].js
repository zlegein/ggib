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

export const getStaticPaths = async () => {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {  
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