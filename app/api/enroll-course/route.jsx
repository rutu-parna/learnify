import { coursesTable, enrollCourseTable } from "../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and,desc } from "drizzle-orm";  
import { NextResponse } from "next/server";
import { db } from "../../config/db";

export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Check if already enrolled
  const enrollcourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress),
        eq(enrollCourseTable.cid, courseId)
      )
    );

  if (enrollcourses?.length === 0) {
    // ✅ Insert new enrollment
    const result = await db
      .insert(enrollCourseTable)
      .values({
        cid: courseId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      })
      .returning();

    return NextResponse.json(result);
  }

  return NextResponse.json({ resp: "Already Enrolled" });
}

export async function GET(req) {
    const user=currentUser();
    const result=await db.select().from(coursesTable)
    .innerJoin(enrollCourseTable,eq(coursesTable.cid,enrollCourseTable.cid))
    .where(eq(enrollCourseTable.userEmail))
    .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
}