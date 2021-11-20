import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'App' }: Props) => (
  <div>
    <Head>
      <title>{title} | Scoreboard</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="container mx-auto pt-6">{children}</div>
  </div>
)

export default Layout
