"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EnrollCourseCard from "./EnrollCourseCard";


function EnrollCourseList() {
    const [enrollCourseList,setEnrolledCourseList]=useState([]);
    useEffect(()=>{
        GetEnrolledCourse();
    },[])
    const GetEnrolledCourse= async()=>{
        const result=await axios.get('/api/enroll-course');
        console.log(result.data);
        setEnrolledCourseList(result.data);

    }

  return enrollCourseList?.length>0 &&(
    <div className='mt-3'>

        <h2 className='font-bold text-3xl'>Continue Learning your courses</h2>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
            {
            enrollCourseList?.map((course,index)=>(
                <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index}/>


        
        ))}
        </div>
        
        </div>
  )
}

export default EnrollCourseList