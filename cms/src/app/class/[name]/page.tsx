"use client"
import { useEffect, useState } from "react";
import { Class } from "@/database/models/Class";
import { useParams } from 'next/navigation'


export default function ClassPage() {

    const [theClass, setTheClass] = useState<Class[] | undefined>(undefined)
    const params = useParams<{ tag: string; name: string }>();
    
    useEffect(() => {

        async function getClassesForUser() {
            try {
                const apiRes = await fetch(`/api/class/${params.name}`, {
                    method: "GET",
                });
    
                if (apiRes.ok) {
                    const data = await apiRes.json();
    
                    setTheClass(data as Class[]); 
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
            
        }
    } catch (error) {
        console.log(error);
    }
}

    return (
        <div>
  {theClass && (
    <div>
      <h1>{theClass.name}</h1>
      <p>{theClass.OrganizationId}</p>
      <button onClick={() => EraseTheClass(theClass._id.toString())}>
        Delete
      </button>

      {/* Students */}
      {Array.isArray(theClass.students) &&
        theClass.students.map((student, index) => {
          if (typeof student === "object" && "name" in student) {
            return <p key={index}>{student.name}</p>;
          }
          return null;
        })}

      {/* Teachers */}
      {Array.isArray(theClass.teachers) &&
        theClass.teachers.map((teacher, index) => {
          if (typeof teacher === "object" && "firstName" in teacher) {
            return (
              <p key={index}>
                {teacher.firstName} {teacher.lastName}
              </p>
            );
          }
          return null;
        })}
    </div>
  )}

        </div>
    );
}

                

