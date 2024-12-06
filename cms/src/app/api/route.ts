import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import Pet from "@/database/models/Pet";


export async function GET(
    req: Request){
        try {
            await dbConnect() 
            const dbResponse = await Pet.find({});
console.log("db response")
            console.log(dbResponse)
    
            if (!dbResponse) {
                return new NextResponse(null, { status: 200 });
            }else{
                return new NextResponse(dbResponse, { status: 200 });
            }
    
        }catch (error) {
            console.log(error)
            return NextResponse(null, { status:500 });
        }
    
          
}