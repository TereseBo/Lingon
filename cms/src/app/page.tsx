"use client"
import { useEffect, useState } from "react";
import { Pets } from "@/database/models/Pet"

export default function Home() {
    const [petResult, setPetResult] = useState<Pets[] | null>(null);

    useEffect(() => {
        const fetchingPet = async () => {
            try {
                const apiRes = await fetch(`/api`, {
                    method: "GET",
                });
                console.log(apiRes)

                if (apiRes.ok) {
                   /*  const data = await apiRes.json(); // Parse JSON data */
                    console.log(data);
                    setPetResult(data); // Update state with parsed data
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchingPet();
    }, []); // Dependency array added

    return (
        <div>
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
