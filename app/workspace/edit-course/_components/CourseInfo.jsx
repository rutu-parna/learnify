import { Book, Clock, Settings, TrendingUp } from 'lucide-react';
import React from 'react'
import Image from "next/image";
import { Button } from '../../../../components/ui/button';



function CourseInfo({course}) {
    
    const courseLayout = course?.courseJson;
    return (
        <div className=' md:flex gap-5 justify-between rounded-2xl shadow'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-3xl'>{course?.name}</h2> 
                <p className='line-clamp-2 text-grey-500'>{courseLayout?.course?.description}</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <Clock className='text-blue-500' />
                        <section>
                            <h2 className='font-bold'>Duration</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <Book className='text-green-500' />
                        <section>
                            <h2 className='font-bold'>Chapters</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <TrendingUp className='text-red-500' />
                        <section>
                            <h2 className='font-bold'>Difficulty Level</h2>
                            <h2>{courseLayout?.level}</h2>
                        </section>
                    </div>
                </div>

                <Button className={'max-w-sm'}> <Settings /> Generate Content</Button>

            </div>

            {course?.bannerImageUrl ? (
                <img
                    src={course.bannerImageUrl}
                    alt={courseLayout?.name || "Course banner p-5 rounded-2xl "}
                    width={400}
                    height={400}
                    className="w-[400px] h-[240px] mt-5 object-cover rounded-lg"
                />
                ) : (
                <Image
                    src="/courselist1.svg"
                    alt="fallback"
                    width={400}
                    height={400}
                    className="w-[400px] mt-5 aspect-auto h-[240px] object-cover rounded-lg"
                />
                )} 

        </div>
    )
}

export default CourseInfo