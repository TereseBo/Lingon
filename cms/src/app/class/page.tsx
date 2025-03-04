"use client"
import { useEffect, useState } from "react";
import { Class } from "@/database/models/Class";

export default function ClassPage() {

    const [classes, setClasses] = useState<Class[] | undefined>(undefined)
    useEffect(() => {

        async function getClassesForUser() {
            try {
                const apiRes = await fetch(`/api/class`, {
                    method: "GET",
                });
    
                if (apiRes.ok) {
                    const data = await apiRes.json(); // Parse JSON data */
    
                    setClasses(data); // Update state with parsed data
                }
            } catch (error) {
                //TODO: Handle error
                console.log(error);
            }
        }

        getClassesForUser()
       

    },[] )



    return (
        <div>
            Welcome to class page!!
            {/* Im thinking you see all classes here, and then you have the option to edit/delete them */}
            {
                classes ? classes.map((classItem, index) => {
                    return (
                        <div key={index}>
                            <h2>{classItem.name}</h2>
                        </div>
                    )
                }) : <p>Loading...</p>
            }

            Do you want to add a class? <a href="/class/create">Click here</a>
        </div>
    );
}
