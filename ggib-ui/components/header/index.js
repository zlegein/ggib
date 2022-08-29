import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const Header = () => {
  const { pathname } = useRouter()

  return (
    <header>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/user/5">
        <a className={pathname === '/user/5' ? 'is-active' : ''}>
          User 5
        </a>
      </Link>
      <Link href="/posts">
        <a className={pathname === '/posts' ? 'is-active' : ''}>
          Posts
        </a>
      </Link>
      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}
