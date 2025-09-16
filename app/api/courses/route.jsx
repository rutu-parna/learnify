import { NextResponse } from "next/server";
import { coursesTable } from "../../config/schema";
import { db } from "../../config/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc, ne, sql } from "drizzle-orm";



export async function GET(req){
     
    const {searchParams} = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const user = await currentUser();

    if(courseId==0){
        const result = await db.select().from(coursesTable).where(sql`${coursesTable.courseContent}::jsonb!='{}'::jsonb`);
        console.log(result);
        return NextResponse.json(result);
    }
    if(courseId){
        const result = await db.select().from(coursesTable).where(eq(coursesTable.cid,courseId));
        console.log(result);
        return NextResponse.json(result[0]);
    }else{
        const result = await db.select().from(coursesTable).where(eq(coursesTable.userEmail,user.primaryEmailAddress?.emailAddress)).orderBy(desc(coursesTable.id));
        console.log(result);
        return NextResponse.json(result);
    }
}