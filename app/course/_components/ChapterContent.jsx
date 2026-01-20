import React, { useContext, useEffect, useState } from 'react';
import SelectedChapterIndexContext from '../../../context/SelectedChapterIndexContext';
import YouTube from 'react-youtube';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import { CheckCircle, Loader2Icon, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const { courses, enrollCourse } = courseInfo ?? {};
  const courseContent = courses?.courseContent;

  const { SelectedChapterIndex } = useContext(SelectedChapterIndexContext);

  const videoData = courseContent?.[SelectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[SelectedChapterIndex]?.courseData?.topics;


  const [completedChapters, setCompletedChapters] = useState(
    enrollCourse?.completedChapters ?? []
  );

  // keep it in sync when courseInfo updates
  useEffect(() => {
    setCompletedChapters(enrollCourse?.completedChapters ?? []);
  }, [enrollCourse]);

  const [loading, setLoading] = useState(false);

const markChapterCompleted = async () => {
  try {
    setLoading(true);
    const updated = [...completedChapters, SelectedChapterIndex];

    setCompletedChapters(updated);

    await axios.put('/api/enroll-course', {
      courseId,
      completedChapter: updated,
    });

    toast.success('Chapter Marked Completed!');
    refreshData();
  } catch (err) {
    toast.error('Failed to update');
  } finally {
    setLoading(false);
  }
};

const markInCompleteChapter = async () => {
  try {
    setLoading(true);
    const updated = completedChapters.filter(
      (item) => item !== SelectedChapterIndex
    );

    setCompletedChapters(updated);

    await axios.put('/api/enroll-course', {
      courseId,
      completedChapter: updated,
    });

    toast.success('Chapter Marked Incomplete!');
    refreshData();
  } catch (err) {
    toast.error('Failed to update');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-10 mt-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          {SelectedChapterIndex + 1}.{' '}
          {courseContent?.[SelectedChapterIndex]?.courseData?.chapterName}
        </h2>

        {!completedChapters.includes(SelectedChapterIndex) ? (
  <Button onClick={markChapterCompleted} disabled={loading}>
    {loading ? <Loader2Icon className="animate-spin" /> : <CheckCircle />}
    Mark as Completed
  </Button>
) : (
  <Button
    variant="outline"
    onClick={markInCompleteChapter}
    disabled={loading}
  >
    {loading ? <Loader2Icon className="animate-spin" /> : <X />}
    Mark Incomplete
  </Button>
)}

      </div>

      {/* Related Videos */}
      <h2 className="my-2 font-bold text-lg">Related Videos 🎬</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videoData?.map(
          (video, index) =>
            index < 2 && (
              <div key={index}>
                <YouTube
                  videoId={video?.videoId}
                  opts={{ height: '250', width: '400' }}
                />
              </div>
            )
        )}
      </div>

      {/* Topics */}
      <div className="mt-7">
        {topics?.map((topic, index) => (
          <div key={index} className="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 className="font-bold text-2xl text-primary">
              {index + 1}. {topic?.topic}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              style={{ lineHeight: '2.5' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;