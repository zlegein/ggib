import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePosts } from '../../hooks'

export const PostList = () => {
  const router = useRouter
  const [postCount, setPostCount] = useState(10)
  const { data, isLoading, isFetching } = usePosts(postCount)
  
  if (isLoading) return <div>Loading</div>
  return (
    <section className="pb-10">
      <ul>
        {data?.posts?.map((post, index) => (
          <li className="container mb-4" key={post.pid}>
            <div className='flex item-center'>
              <span className="text-lg mr-2">{index + 1}. </span>
              <Link href={`/posts/${post.pid}`}>
                {post.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {postCount <= 90 && (
        <button className='self-center border-solid border-2 bg-sky-500/100'
          onClick={() => setPostCount(postCount + 10)}
          disabled={isFetching}
        >
          {isFetching ? 'Loading...' : 'Show More'}
        </button>
      )}
    </section>
  )
}
