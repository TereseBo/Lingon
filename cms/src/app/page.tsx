"use client"
import { useState } from "react";
import { Employee } from "@/database/models/Employee"
import {Menu} from "@/components/menu"

export default function Home() {
    const [petResult, setPetResult] = useState<Employee[] | null>(null);
    async function tryDatabase() {
        try {
            const apiRes = await fetch(`/api`, {
                method: "GET",
            });

            if (apiRes.ok) {
                const data = await apiRes.json(); // Parse JSON data */

                setPetResult(data); // Update state with parsed data
            }
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    }

    return (
        <div>
            <Menu/>
            <button onClick={tryDatabase}>Click me for fetch</button>
            {petResult ? (
                petResult.map((employee, index) => (
                    <div key={index}>{employee.firstName || "Unknown Name"}</div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
