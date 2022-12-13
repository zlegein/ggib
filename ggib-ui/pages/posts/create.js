import React from 'react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'  
import { Layout, Header } from '../../components'
import { fetchUser } from '../../hooks'

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

const CreatePost = () => {

  return (
    <Layout>
      <Header />
      <form action="/api/create-post" method='post'>
        <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Author</label>
        <input 
          type="text" 
          id="author" 
          name="author"
          placeholder="Enter Name"
          aria-label="author"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
        <input 
          type="text" 
          id="title" 
          name="title"
          placeholder="Enter Title"
          aria-label="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Content</label>
        <input 
          type="text" 
          id="content" 
          name="content"
          placeholder="Enter Content"
          aria-label="content"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default CreatePost