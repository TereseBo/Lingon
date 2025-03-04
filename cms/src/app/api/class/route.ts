import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import Class from "@/database/models/Class";
import Student from "@/database/models/Student";
import Employee from "@/database/models/Employee";
import { auth, clerkClient } from '@clerk/nextjs/server'



export async function GET(
    req: Request,) {
    console.log(req)
    try {
        await dbConnect()
        const dbResponse: typeof Class[] = await Class.find({});

        if (!dbResponse) {
            return NextResponse.json(null, { status: 503 });
        } else {
            return NextResponse.json(dbResponse, { status: 200 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }


}

export async function POST(
    req: Request,) {
    try {
        await dbConnect()
        const { name } = await req.json()
        const { userId, orgId } = await auth()
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
          }
        
          const client = await clerkClient()
          const user = await client.users.getUser(userId)
          if (!user) {
            return new NextResponse('Unauthorized', { status: 401 })
          }
        console.log("User object: ", user)
        const newTeacher = await Employee.create({ 
            firstName: user.firstName || "Unknown", 
            lastName: user.lastName || "User" 
        });
        const dbResponse = await Class.create({ name: name, teacher: {newTeacher}, OrganizationId: orgId });
        return NextResponse.json(dbResponse, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }
}


export async function PATCH(
    req: Request,) {
    try {
        await dbConnect()
        const { name, student } = await req.json()
        const newStudent = await Student.create({ name: student });
        const dbResponse = await Class.updateOne({ name: name
        },
            { $addToSet: { students: newStudent._id }
         });
         
        return NextResponse.json(dbResponse, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }
}
