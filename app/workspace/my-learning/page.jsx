import React from 'react'
import EnrollCourseList from '../_components/EnrollCourseList'

function MyLearning() {
  return (
    <div className="p-6">
      <h2 className="text-4xl mb-5 font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
        📚 My Learnings
      </h2>
      <div className="mt-8">
        <EnrollCourseList />
      </div>
    </div>
  )
}

export default MyLearning
