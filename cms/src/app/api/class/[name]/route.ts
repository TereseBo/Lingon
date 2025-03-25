import { NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import Class from '@/database/models/Class'
import { NextRequest } from 'next/server'


export async function GET(req: NextRequest) : Promise<NextResponse> {
    const url = new URL(req.url);
    const name = url.pathname.split("/").pop();

    try {
        await dbConnect()
        const classinformation = await Class.findOne({name})
        .populate('students')
        .populate('teachers')
        .exec()
        if (!classinformation) {
            return NextResponse.json(null, { status: 503 });
        } else {

        
            return NextResponse.json(classinformation, { status: 200 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }


}

export async function DELETE(req: NextRequest) : Promise<NextResponse> {
    const url = new URL(req.url);
    const _id = url.pathname.split("/").pop();
    try {
        await dbConnect()
        const correctClass = await Class.findOne({_id})
        if (!correctClass) {
            return NextResponse.json(null, { status: 503 });
        } else {

            const deleted = await correctClass.deleteOne({_id})

        
            return NextResponse.json(deleted, { status: 200 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }


}