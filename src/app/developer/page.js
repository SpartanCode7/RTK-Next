"use client"
import { Inter } from '@next/font/google'
import User from '../../features/user/userList'

const inter = Inter({ subsets: ['latin'] })

export default function Developer() {
  return (
    <>
      <User />
    </>
  )
}
