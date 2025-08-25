// app/api/generate-course-content/route.js (or route.ts if using TypeScript)

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../config/db";
import { eq } from "drizzle-orm";
   
// Initialize Gemini client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
import axios from "axios";
import { coursesTable } from "../../config/schema";


// Prompt template
const PROMPT = `Depends on chapter name and topics, generate detailed content for each topic in HTML.
Return response strictly in JSON format only.

Schema:
{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "string (HTML)"
    }
  ]
}

User Input:
`;

export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();
    console.log("📩 Received body:", { courseJson, courseTitle, courseId });


    // // Validate input
    // if (!courseJson || !courseJson.chapters) {
    //   return NextResponse.json(
    //     { error: "Invalid course data received" },
    //     { status: 400 }
    //   );
    // }

    // Load Gemini model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content for each chapter
    const promises = courseJson?.course?.chapters.map(async (chapter) => {
      const prompt = PROMPT + JSON.stringify(chapter);

      const result = await model.generateContent(prompt);

      // Extract raw response text
      let rawResp =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Remove markdown formatting if present
      rawResp = rawResp.replace(/```json|```/g, "").trim();

      let parsed;
      try {
        parsed = JSON.parse(rawResp);
      } catch (err) {
        console.error("❌ JSON parse error:", rawResp);
        parsed = {
          chapterName: chapter.chapterName || "Untitled Chapter",
          topics: [],
        };
      }

      const youtubeData = await GetYoutubeVideo(chapter?.chapterName);


      return{
        youtubeVideo:youtubeData,
        courseData: parsed
      }
    });

    const CourseContent = await Promise.all(promises);

    // Final response
    const dbResp = await db.update(coursesTable).set({
        courseContent:CourseContent 
    }).where(eq(coursesTable.cid,courseId));
      
    return NextResponse.json({
      courseId,
      courseName: courseTitle,
      CourseContent,
    });
  } catch (err) {
    console.error("❌ Error generating course content:", err);
    return NextResponse.json(
      {
        error: "Failed to generate course content",
        details: err.message,
      },
      { status: 500 }
    );
  }
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

const GetYoutubeVideo = async (topic)=>{
    const params = {
        part :'snippet',
        q:topic,
        maxResults:4,
        type:'video',
        key:process.env.YOUTUBE_API_KEY
    }
    const resp  = await axios.get(YOUTUBE_BASE_URL,{params});
    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList = [];
    youtubeVideoListResp.forEach((item)=>{
        const data = {
            videoId :item.id?.videoId,
            title:item?.snippet?.title
        }
        youtubeVideoList.push(data);
    })
    console.log("youtubeVideoList",youtubeVideoList);
    return resp.data.items;
}
