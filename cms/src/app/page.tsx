"use client"
import { useState } from "react";
import { Pet } from "@/database/models/Pet"

export default function Home() {
    const [petResult, setPetResult] = useState<Pet[] | null>(null);
    async function tryDatabase() {
        try {
            const apiRes = await fetch(`/api`, {
                method: "GET",
            });
            console.log(apiRes)

            if (apiRes.ok) {
                const data = await apiRes.json(); // Parse JSON data */

                setPetResult(data); // Update state with parsed data
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={tryDatabase}>Click me for fetch</button>
            {petResult ? (
                petResult.map((pet, index) => (
                    <div key={index}>{pet.name || "Unknown Name"}</div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
