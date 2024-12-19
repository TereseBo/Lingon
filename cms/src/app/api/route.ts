import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import petModel,{Pet} from "@/database/models/Pet";


export async function GET(
    req: Request,) {
    console.log(req)
    try {
        await dbConnect()
        const dbResponse:Pet[] = await petModel.find({});

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