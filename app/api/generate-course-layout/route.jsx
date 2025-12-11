import { coursesTable } from "../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../config/db";
import { NextResponse } from "next/server";

import { InferenceClient } from "@huggingface/inference";
import cloudinary from "../../config/cloudinary";

// -------------------------
//  STRICT JSON PROMPT
// -------------------------
const PROMPT = `
You MUST return ONLY valid JSON. 
No markdown, no explanation, no notes, no commentary.

Schema format to follow strictly:

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
        "topics": ["string"]
      }
    ]
  }
}

Rules:
- Output MUST be valid JSON only.
- Do NOT wrap inside backticks.
- Do NOT add bold text or markdown formatting.

User Input:
`;

export async function POST(req) {
  console.log("✅ HF TOKEN LOADED:", !!process.env.HUGGINGFACE_API_KEY);
  console.log(
    "🔑 HF TOKEN PREFIX:",
    process.env.HUGGINGFACE_API_KEY?.slice(0, 6)
  );

  try {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();

    // -------------------------
    //  HF DeepSeek Client
    // -------------------------
    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    let rawResp = "";

    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3.2:novita",
      messages: [
        {
          role: "user",
          content: PROMPT + JSON.stringify(formData),
        },
      ],
      max_tokens: 1600,
      temperature: 0.4,
    });

    rawResp = chatCompletion?.choices?.[0]?.message?.content || "";

    if (!rawResp) {
      return NextResponse.json(
        { error: "No response from DeepSeek" },
        { status: 500 }
      );
    }

    // -------------------------
    //  Extract JSON reliably
    // -------------------------
    const jsonMatch = rawResp.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("❌ Could not find JSON in response:", rawResp);
      return NextResponse.json(
        { error: "AI did not return valid JSON" },
        { status: 500 }
      );
    }

    let rawJson = jsonMatch[0];

    let jsonResp;
    try {
      jsonResp = JSON.parse(rawJson);
      console.log("✅ Parsed JSON:", jsonResp);
    } catch (err) {
      console.error("❌ JSON Parse Error:", rawJson);
      return NextResponse.json(
        { error: "Invalid JSON returned by AI" },
        { status: 500 }
      );
    }

    // -------------------------
    //  Generate Image Prompt
    // -------------------------
    const ImagePrompt =
      jsonResp?.course?.bannerImagePrompt ||
      `Create a modern educational illustration for: ${formData.name}`;

    const bannerImageUrl = await GenerateImage(ImagePrompt);

    // -------------------------
    //  Save to DB
    // -------------------------
    await db.insert(coursesTable).values({
      ...formData,
      courseJson: jsonResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
      bannerImageUrl,
    });

    return NextResponse.json({ courseId }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error in generate-course-layout:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// -------------------------
// IMAGE GENERATION (FLUX)
// -------------------------


const GenerateImage = async (prompt) => {
  if (!prompt) return null;

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "image/png",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      console.error("❌ HF Image API Error:", await response.text());
      return null;
    }

    // Convert HF PNG bytes → buffer
    const buffer = Buffer.from(await response.arrayBuffer());

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "courses",
          resource_type: "image",
        },
        (err, result) => {
          if (err) {
            console.error("❌ Cloudinary Upload Error:", err);
            reject(err);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.end(buffer); // push PNG buffer
    });
  } catch (err) {
    console.error("🔥 GenerateImage Exception:", err);
    return null;
  }
};

export default GenerateImage;
