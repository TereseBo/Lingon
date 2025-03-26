import { NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'
import { NextRequest } from 'next/server'
import Class from '@/database/models/Class'
import Student from '@/database/models/Student'

export async function DELETE(req: NextRequest) : Promise<NextResponse> {
    const { studentName } = await req.json()
    const url = new URL(req.url);
    const name = url.pathname.split('/')[3]
    try {
        await dbConnect()
        const classinformation = await Class.findOne({name})
        .populate('students')
        .populate('teachers')
        .exec()
        if (!classinformation) {
            return NextResponse.json(null, { status: 503 });
        } else {

            const student = await Student.findOne({name: studentName})
            if (!student) {
                return NextResponse.json(null, { status: 503 });
            } else {
                const deleted = await classinformation.students.pull(student)
                await classinformation.save()
                return NextResponse.json(deleted, { status: 200 });
            }
        
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }

}

export async function POST(req: NextRequest) : Promise<NextResponse> {
    const {newStudentName} = await req.json()
    const url = new URL(req.url);
    const name = url.pathname.split('/')[3]
    try {
        await dbConnect()
        const classinformation = await Class.findOne({name})
        .populate('students')
        .populate('teachers')
        .exec()
        if (!classinformation) {
            return NextResponse.json(null, { status: 503 });
        } else {
            const student = new Student({name: newStudentName})
            await student.save()
            classinformation.students.push(student)
            await classinformation.save()
            return NextResponse.json(student, { status: 200 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }
}