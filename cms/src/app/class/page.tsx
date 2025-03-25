"use client"
import { useEffect, useState } from "react";
import { Class } from "@/database/models/Class";
import Link from "next/link";

export default function ClassPage() {

    const [classes, setClasses] = useState<Class[] | undefined>(undefined)

    useEffect(() => {

        async function getClassesForUser() {
            try {
                const apiRes = await fetch(`/api/class`, {
                    method: "GET",
                });
    
                if (apiRes.ok) {
                    const data = await apiRes.json();
    
                    setClasses(data as Class[]); 
                }
            } catch (error) {
                //TODO: Handle error
                console.log(error);
            }
        }

        getClassesForUser()
       

    },[] )

const EraseTheClass = async (classId: string): Promise<void> => {
    
    try {
        const apiRes = await fetch(`/api/class/${classId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: classId,
            }),
        });

        if (apiRes.ok) {
            const data = await apiRes.json();
            console.log("Deleted class:", data);
            setClasses(classes?.filter((classItem) => classItem._id !== classId));
            
        }
    } catch (error) {
        console.log(error);
    }
}

//TODO: Add edit functionality
    return (
        <div>
            Welcome to class page!!
            {/* Im thinking you see all classes here, and then you have the option to edit/delete them */}
            {
                classes ? classes.map((classItem: Class, index) => {
                    return (
                        <div key={index}>
                            
                            <h2>{classItem.name}</h2><button><Link href={`/class/${classItem.name}`}>Edit</Link></button><button onClick={() => EraseTheClass(classItem._id as string)}>Erase</button>
                        </div>
                    )
                }) : <p>Loading...</p>
            }

            Do you want to add a class? <a href="/class/create">Click here</a>
        </div>
    );
}
