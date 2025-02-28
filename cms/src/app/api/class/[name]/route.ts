import { NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import Class from '@/database/models/Class'
import { NextRequest } from 'next/server'


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    console.log(name);
    try {
        await dbConnect()
        const dbResponse: typeof Class[] = await Class.find({name});

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