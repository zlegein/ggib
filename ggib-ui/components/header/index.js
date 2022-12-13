import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const Header = () => {
  const { pathname } = useRouter()

  return (
    <header className="space-x-10">
      <Link href="/">
      <a className="text-xl text-slate-500 hover:text-blue-600 hover:underline">Home</a>
      </Link>
      <Link href="/user">
        <a className="text-xl text-slate-500 hover:text-blue-600 hover:underline">
          User
        </a>
      </Link>
      <Link href="/posts">
      <a className="text-xl text-slate-500 hover:text-blue-600 hover:underline">
          Posts
        </a>
      </Link>
      <Link href="/posts/create">
      <a className="text-xl text-slate-500 hover:text-blue-600 hover:underline">
          Create
        </a>
      </Link>
    </header>
  )
}
