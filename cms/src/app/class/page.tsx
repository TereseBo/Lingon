"use client"
import { useEffect, useState } from "react";

export default function ClassPage() {

    const [classes, setClasses]= useState(undefined)
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
       

    }, )



    return (
        <div>
            Welcome to class page!!

            {
                classes===undefined?<div>Nej</div>:<div>Yay</div>
            }
        </div>
    );
}
