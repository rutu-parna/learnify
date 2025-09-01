import React, { useContext } from 'react'
import SelectedChapterIndexContext from '../../../context/SelectedChapterIndexContext';
import YouTube from 'react-youtube';

function ChapterContent({courseInfo}) {
  const {courses,enrollCourse} = courseInfo ?? ''; 
  const courseContent = courseInfo?.courses?.courseContent;
  const {SelectedChapterIndex,setSelectedChapterIndex} = useContext(SelectedChapterIndexContext)
  const videoData = courseContent?.[SelectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[SelectedChapterIndex]?.courseData?.topics;

  return (
    <div className='p-10 ml-80 mt-20'>
        <h2 className='font-bold text-2xl'>{SelectedChapterIndex+1}. {courseContent?.[SelectedChapterIndex]?.courseData?.chapterName}</h2>

        <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {videoData?.map((video,index)=> index<2 &&  (
            <div key={index}>
              <YouTube videoId={video?.videoId}
              opts={{
                height:'250',
                width:'400',
                
              }}
              />
            </div>
          ))}
        </div>

        <div className='mt-7'>
          {topics?.map((topic,index) =>(
            <div key = {index} className='mt-10 p-5 bg-secondary rounded-2xl'>
              <h2 className='font-bold text-2xl text-primary'>{index+1}. {topic?.topic}</h2>
              <div dangerouslySetInnerHTML={{__html:topic?.content}}
              style={{
                lineHeight:'2.5'
              }}
              ></div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ChapterContent