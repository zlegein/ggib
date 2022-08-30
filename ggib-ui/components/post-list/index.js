import React, { useState } from 'react'
import { usePosts } from '../../hooks'

export const PostList = () => {
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
              <a className="text-lg mr-4 no-underline" href="#">{post.title}</a>
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
