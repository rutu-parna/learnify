import React from 'react'

const WelcomeBanner = () => {
  return (
    <div className="relative p-8 mt-5 mb-5 rounded-2xl overflow-hidden shadow-xl shadow-blue-500/30 flex items-center justify-center text-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x opacity-90" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h2 className="font-extrabold text-3xl text-white drop-shadow-lg">
          🚀 Welcome to Online Learning Platform
        </h2>
        <p className="mt-2 text-lg text-white/90">
          Learn, Create, and Explore your favourite courses with AI-powered guidance.
        </p>
      </div>
    </div>
  )
}

export default WelcomeBanner
