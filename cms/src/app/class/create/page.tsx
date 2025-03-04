"use client"
import { useState, FormEvent } from "react";
import  { Class }  from "@/database/models/Class"
import { Student } from "@/database/models/Student"



export default function ClassPage() {
    const [className, setClassName] = useState("");
    const [studentName, setStudentName] = useState("");
    const [theClass, setTheClass] = useState< Class | null >(null);
    const [newClassName, setNewClassName] = useState("");

const getNewClassForUser = async () => {
        try {
            const apiRes = await fetch(`/api/class/${newClassName}`, {
                method: "GET",
            });

            if (apiRes.ok) {
                const data = await apiRes.json();
                setTheClass(data); 
                console.log("The class-data:", data);
            }
        } catch (error) {

            console.log(error);
        }
    }


const addNewClass = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
        const apiRes = await fetch(`/api/class`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: className,
            }),
        });

        if (apiRes.ok) {
            const data = await apiRes.json();
            setNewClassName(data.name);
            setClassName("");
            getNewClassForUser();
        }
    } catch (error) {


        console.log(error);
    }
}

const AddStudentToClass = async (e: FormEvent): Promise<void> => {
    console.log("Add student to class")
    e.preventDefault();
    try {
        const apiRes = await fetch(`/api/class/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newClassName,
                student: studentName,
            }),
        });

        if (apiRes.ok) {
            const data = await apiRes.json();
            setNewClassName(data.name);
            getNewClassForUser();
            setStudentName("");

        }
    }
    catch (error) {
        console.log(error);
    }
}

    return (
       <div>
        { newClassName && theClass ? <div><h1>{newClassName}</h1>
        <ul>
            {theClass.students && theClass.students.map((student:Student, index: number) => (
                <li key={index}>{student.name}</li>
            ))}
        </ul>
        <form>
            <label>
                Lägg till elever:
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            </label>
            <button type="submit" onClick={AddStudentToClass}>Lägg till elev</button>
        </form>
        </div>
        :<form>
            <label>
                Klassnamn
                <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
            </label>
            <button type="submit" onClick={addNewClass}>Skapa klass</button>
        </form>}

       </div>
    );
}
