'use client';
import React from 'react'
import { SidebarTrigger } from '../../../components/ui/sidebar'
import { UserButton } from "@clerk/nextjs";

const AppHeader = ({ hideSidebar = false }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {!hideSidebar && <SidebarTrigger />}
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            My Learning App
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications (optional future) */}
          {/* <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition" /> */}
          
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export default AppHeader
