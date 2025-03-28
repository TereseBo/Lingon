"use client"
import { useEffect, useState } from "react";
import { Class } from "@/database/models/Class";
import { useParams } from 'next/navigation'


export default function ClassPage() {

    const [theClass, setTheClass] = useState<Class | undefined>(undefined)
    const [newStudentName, setNewStudentName] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);
    const params = useParams<{ tag: string; name: string }>();

    useEffect(() => {

        async function getClassForUser() {
            try {
                const apiRes = await fetch(`/api/class/${params.name}`, {
                    method: "GET",
                });
    
                if (apiRes.ok) {
                    const data = await apiRes.json();
    
                    setTheClass(data as Class); 
                }
            } catch (error) {
                //TODO: Handle error
                console.log(error);
            }
        }

        getClassForUser()
       

    },[params.name, update ] )

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

const EraseStudentFromClass = async (studentName: string): Promise<void> => {
      
      try {
          const apiRes = await fetch(`/api/class/${params.name}/student`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  studentName: studentName,
              }),
          });
  
          if (apiRes.ok) {
              const data = await apiRes.json();
              console.log("Deleted student:", data);
              setUpdate(!update);
              
          }
      } catch (error) {
          console.log(error);
      }
  }


  const AddNewStudentToClass = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudentName = formData.get("newStudentName") as string;
    try {
        const apiRes = await fetch(`/api/class/${params.name}/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newStudentName: newStudentName,
            }),
        });

        if (apiRes.ok) {
            const data = await apiRes.json();
            console.log("Added student:", data);
            setNewStudentName("");
            setUpdate(!update);  
            
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
            return <div key={index}><p>{student.name}</p><button onClick={() => EraseStudentFromClass(student.name)}>Remove from classlist</button></div>;
          }
          return null;
        })}
        <form onSubmit={(e) => AddNewStudentToClass(e)}>

        <label htmlFor="newStudentName">Add new student:</label> <input type="text" name="newStudentName" onChange={(e) => setNewStudentName(e.target.value)}/>
        <button>Submit</button>
        </form>
        
      {/* Teachers */}
      {Array.isArray(theClass.teachers) &&
        theClass.teachers.map((teacher, index) => {
          if (typeof teacher === "object" && "firstName" in teacher) {
            return (
              <div key={index}>
                <p>{teacher.firstName} {teacher.lastName}</p>
              </div>
            );
          }
          return null;
        })}
    </div>
  )}

        </div>
    );
}

                

