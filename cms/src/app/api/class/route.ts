import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import Class from "@/database/models/Class";


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
        const dbResponse = await Class.create({ name: name });
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
        const dbResponse = await Class.updateOne({ name: name
        },
            { $addToSet: { students: { name:student } }

         });
        return NextResponse.json(dbResponse, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }
}
