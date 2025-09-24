import { Book, Clock, PlayIcon, Settings, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';

import Image from "next/image";
import { Button } from '../../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import Link from 'next/link';




function CourseInfo({course,viewCourse}) {
    
    const courseLayout = course?.courseJson;
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const GenerateCourseContent = async ()=>{

        setLoading(true);
        try {
            const result = await axios.post('/api/generate-course-content',{
                courseJson : courseLayout,
                courseTitle : course?.name,
                courseId:course?.cid
            });

            console.log(result.data);
            setLoading(false);
            router.replace('/workspace');
            toast.success('Course Generated Successfully')
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast("Server Side Error,Try Again")
        }
    }

    // Convert duration string (like "1.5 hours", "30 minutes", "2 hrs 15 mins") → minutes
const parseDurationToMinutes = (duration) => {
  if (!duration) return 0;

  const lower = duration.toLowerCase();

  let totalMinutes = 0;

  // Match hours (e.g., "1 hour", "2 hrs", "1.5 hours")
  const hourMatch = lower.match(/([\d.]+)\s*hour/);
  if (hourMatch) {
    totalMinutes += parseFloat(hourMatch[1]) * 60;
  }

  // Match minutes (e.g., "30 minutes", "45 min")
  const minMatch = lower.match(/([\d.]+)\s*min/);
  if (minMatch) {
    totalMinutes += parseFloat(minMatch[1]);
  }

  return totalMinutes;
};

// Sum up durations of all chapters
const calculateTotalDuration = (chapters) => {
  if (!chapters) return "0 hrs";

  const totalMinutes = chapters.reduce((total, chapter) => {
    return total + parseDurationToMinutes(chapter.duration);
  }, 0);

  // Convert back to hrs + mins
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `${hours} hrs ${minutes} mins`;
  if (hours > 0) return `${hours} hrs`;
  return `${minutes} mins`;
};



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
                            <h2>
                            {calculateTotalDuration(courseLayout?.course?.chapters)} 
                            </h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <Book className='text-green-500' />
                        <section>
                            <h2 className='font-bold'>Chapters</h2>
                            <h2>{courseLayout?.course?.noOfChapters} Chapters</h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <TrendingUp className='text-red-500' />
                        <section>
                            <h2 className='font-bold'>Difficulty Level</h2>
                            <h2>{courseLayout?.course?.level}</h2>
                        </section>
                    </div>
                </div>

                {!viewCourse ?
                 <Button onClick={GenerateCourseContent} className="max-w-sm">
                    {loading ? "Generating..." : <> <Settings /> Generate Content </>} </Button>
                    : <Link href={'/course/'+course?.cid}> <Button> <PlayIcon/> Continue Learning </Button> </Link>}  


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