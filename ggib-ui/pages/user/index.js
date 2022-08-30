import React from 'react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'  
import { Layout, Header } from '../../components'
import { fetchUser } from '../../hooks'

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

const User = () => {
  const router = useRouter()
   const [user, setUser] = React.useState('')

   const handleParam = setValue => e => setValue(e.target.value)

   const handleSubmit = preventDefault(() => {
     router.push({ pathname: `/user/${user}`})
   })

   return (
    <Layout>
      <Header />
      <form onSubmit={handleSubmit}>
        <label for="userid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User Id</label>
        <input 
          type="text" 
          id="userid" 
          name="user"
          value={user}
          onChange={handleParam(setUser)}
          placeholder="Enter User Id"
          aria-label="User Id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Enter User Id"
        />
      </form>
    </Layout>
     
  )
}

export default User