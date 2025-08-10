import { db } from '@/app/config/db';
import { coursesTable } from '@/app/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const PROMPT = `Generate Learning Course depends on following details...`; // shortened for clarity

export async function POST(req) {
  const { courseId, formData } = await req.json();
  const user = await currentUser();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const config = { responseMimeType: 'text/plain' };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        { text: PROMPT + JSON.stringify(formData) },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const RawResp = response?.candidates[0]?.content?.parts[0]?.text || '';
  const RawJson = RawResp.replace('```json', '').replace('```', '');
  const JSONResp = JSON.parse(RawJson);

  await db.insert(coursesTable).values({
    ...formData,
    courseJson: RawResp,
    userEmail: user?.primaryEmailAddress?.emailAddress || null,
    cid: courseId
  });

  return NextResponse.json(JSONResp);
}
