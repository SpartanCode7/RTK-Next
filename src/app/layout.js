"use client"
import './globals.css'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { apiSlice } from '@/features/api/userApiSlice'
import User from '@/features/user/userList'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
          <ApiProvider api={apiSlice}>
              {children}
          </ApiProvider>
        </body>
    </html>
  )
}
