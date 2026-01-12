// app/api/generate-course-content/route.js

import { NextResponse } from "next/server";
import { db } from "../../config/db";
import { eq } from "drizzle-orm";
import axios from "axios";

import { InferenceClient } from "@huggingface/inference";
import { coursesTable } from "../../config/schema";

// HF Client
const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

// ------------ PROMPT ------------
const PROMPT = `
You MUST return ONLY VALID JSON. 
NO markdown, NO explanations, NO extra text.

You will receive a chapter with:
- chapterName
- topics: ["t1", "t2"]

For each topic generate clean HTML learning content.

STRICT JSON SCHEMA:
{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "string"
    }
  ]
}

Return ONLY JSON. NOTHING ELSE.

User Input:
`;  

export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();
    console.log("📩 Received body:", { courseJson, courseTitle, courseId });

    if (!courseJson?.course?.chapters) {
      return NextResponse.json(
        { error: "Invalid course structure" },
        { status: 400 }
      );
    }

    // ------------ PROCESS EACH CHAPTER ------------
    const promises = courseJson.course.chapters.map(async (chapter) => {
      const prompt = PROMPT + JSON.stringify(chapter);

      // HF Chat Completion
      const result = await hf.chatCompletion({
        model: "deepseek-ai/DeepSeek-V3.2:novita",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      let rawResp = result?.choices?.[0]?.message?.content || "";
      console.log("🔥 RAW HF RESPONSE:", rawResp);

      // ------------ CLEAN JSON ------------
      let clean = rawResp.replace(/```json|```/g, "").trim();
      const first = clean.indexOf("{");
      const last = clean.lastIndexOf("}");
      if (first !== -1 && last !== -1) clean = clean.substring(first, last + 1);

      let parsedJson;
      try {
        parsedJson = JSON.parse(clean);
      } catch (err) {
        console.error("❌ JSON Parse Error:", clean);
        parsedJson = {
          chapterName: chapter.chapterName,
          topics: chapter.topics.map((t) => ({
            topic: t,
            content: "<p>Content could not be generated.</p>",
          })),
        };
      }

      // ------------ FETCH YOUTUBE VIDEO ------------
      const youtubeData = await GetYoutubeVideo(chapter.chapterName);

      return {
        youtubeVideo: youtubeData,
        courseData: parsedJson,
      };
    });

    const CourseContent = await Promise.all(promises);

    // ------------ SAVE COURSE CONTENT ------------
    await db
      .update(coursesTable)
      .set({ courseContent: CourseContent })
      .where(eq(coursesTable.cid, courseId));

    return NextResponse.json(
      {
        courseId,
        courseName: courseTitle,
        CourseContent,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error generating course content:", err);
    return NextResponse.json(
      { error: "Failed to generate course content", details: err.message },
      { status: 500 }
    );
  }
}

// ------------ YOUTUBE VIDEO SEARCH ------------
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

async function GetYoutubeVideo(topic) {
  try {
    const params = {
      part: "snippet",
      q: topic,
      maxResults: 4,
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });

    return resp.data.items.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));
  } catch (err) {
    console.error("❌ YouTube Error:", err);
    return [];
  }
}
