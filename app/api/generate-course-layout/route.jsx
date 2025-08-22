import { coursesTable } from "../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../config/db";
import { NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// ---- PROMPT TEMPLATE ----
const PROMPT = `Generate Learning Course depends on following details. 
Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format, Chapter Name, Topic under each chapters, Duration for each chapters etc, in JSON format only.  

Schema:  
{  
  "course": {  
    "name": "string",  
    "description": "string",  
    "category": "string",  
    "level": "string",  
    "includeVideo": "boolean",  
    "noOfChapters": "number",  
    "bannerImagePrompt": "string",  
    "chapters": [  
      {  
        "chapterName": "string",  
        "duration": "string",  
        "topics": [  
          "string"  
        ]  
      }  
    ]  
  }  
}  

User Input:
`;

export async function POST(req) {
  try {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();

    // ✅ Setup Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


    // ✅ Call Gemini with raw prompt
    const prompt = PROMPT + JSON.stringify(formData);
    const result = await model.generateContent(prompt);
    
    console.log("GEMINI RAW RESULT:", JSON.stringify(result, null, 2));

    // console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");

    // ✅ Extract response
    const rawResp =
      result?.response?.candidates[0]?.content?.parts[0]?.text || "";
    if (!rawResp) {
      return NextResponse.json({ error: "No response from Gemini" }, { status: 500 });
    }

    // ✅ Clean JSON if wrapped in ```json ... ```
    // const rawJson = rawResp.replace(/```json|```/g, "").trim();

    // let jsonResp;
    // try {
    //   jsonResp = JSON.parse(rawJson);
    // } catch (err) {
    //   console.error("JSON Parse Error:", err, rawResp);
    //   return NextResponse.json(
    //     { error: "Failed to parse JSON from AI response" },
    //     { status: 500 }
    //   );
    // }

    
let rawJson = rawResp; // from Gemini or OpenAI or wherever

// 1. Remove code fences like ```json or ```
rawJson = rawJson.replace(/```json/g, "").replace(/```/g, "");

// 2. Optionally, strip any trailing notes after the JSON object
const firstBrace = rawJson.indexOf("{");
const lastBrace = rawJson.lastIndexOf("}");
if (firstBrace !== -1 && lastBrace !== -1) {
  rawJson = rawJson.substring(firstBrace, lastBrace + 1);
}

let jsonResp;
try {
  jsonResp = JSON.parse(rawJson);
  console.log("✅ Parsed JSON:", jsonResp);
} catch (err) {
  console.error("❌ JSON Parse Error:", err, rawJson);
  return NextResponse.json({ error: "Failed to parse JSON" }, { status: 500 });
}

    console.log("RAW RESPONSE:", rawResp);
    console.log("PARSED JSON:", jsonResp);

    const ImagePrompt = jsonResp?.course?.bannerImagePrompt || `Create a modern flat 2D educational course illustration for ${formData.name || "the course"}`;
    console.log(ImagePrompt);
    const bannerImageUrl = await GenerateImage(ImagePrompt);
    console.log("Gemini RAW RESPONSE:", JSON.stringify(result, null, 2));


    // ✅ Save to DB

    // delete formData.bannerImagePrompt;
    

    await db.insert(coursesTable).values({
      ...formData,
      courseJson: jsonResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
      bannerImageUrl:bannerImageUrl
    });

    return NextResponse.json({ courseId }, { status: 200 });
  } catch (error) {
    console.error("Error in generate-course-layout:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};




import cloudinary from "../../config/cloudinary";

const GenerateImage = async (ImagePrompt) => {
  if (!ImagePrompt) return null;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: ImagePrompt }),
      }
    );

    if (!response.ok) {
      const errMsg = await response.text();
      console.error("❌ HF API Error:", errMsg);
      return null;
    }

    // Hugging Face returns raw PNG bytes
    const buffer = Buffer.from(await response.arrayBuffer());

    // Upload buffer directly to Cloudinary
    const uploadResp = await cloudinary.uploader.upload_stream({
      folder: "courses",  // optional: put all images in "courses" folder
      resource_type: "image",
    });

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "courses" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url); // ✅ only return URL
        }
      );
      stream.end(buffer);
    });
  } catch (error) {
    console.error("🔥 Exception in GenerateImage:", error);
    return null;
  }
};










