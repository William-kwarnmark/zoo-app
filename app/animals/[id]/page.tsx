"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Animal } from "@/app/models/Animal";
import { feedAnimal, getAnimalById } from "@/app/services/animalService";
import { hrsPassed } from "@/app/services/timeService";

export default function AnimalPage() {
    const params = useParams();
    const id = Number(params.id);

    const [animal, setAnimal] = useState<Animal | undefined>();

    useEffect(() => {
        async function loadAnimal() {
            const data = await getAnimalById(id);
            setAnimal(data);
        }

        loadAnimal();
    }, [id]);

    function handleFeedAnimal() {
        feedAnimal(id);

        setAnimal((currentAnimal) => 
        currentAnimal ? {...currentAnimal, isFed: true, lastFed: new Date().toISOString(),} 
        : currentAnimal
        );
    }

    if (!animal) {
        return <p className="p-8">Djuret hittades inte</p>;
    }

    return (
        <main className="p-8 max-w-3xl mx-auto text-yellow-300">
            <Link href="/" 
            className="inline-block border px-4 py-4 rounded hover:bg-amber-600 cursor-pointer">Tillbaka</Link>
            <h1 className="text-4xl font-bold mt-6 mb-2">{animal.name}</h1>
            <h2 className="text-xl italic mb-6">{animal.latinName}</h2>
            <img src={animal.imageUrl} alt={animal.name}
            onError={(event) => {
              event.currentTarget.src = "/placeholder-animal.png";
            }}
            className="w-full h-64 object-contain rounded mb-4"></img>

            <p className="mb-4">{animal.longDescription}</p>
            <p>Födelseår: {animal.yearOfBirth}</p>
            <p>Medicin: {animal.medicine}</p>
            <p className="mt-4 font-medium">Status:{animal.isFed ? "Djuret är matat" : "Djuret är inte matat"}</p>

            {animal.isFed && (
                <p>Senast matad: {""} {new Date(animal.lastFed).toLocaleString("sv-SE")}</p>
            )}

            {hrsPassed(animal.lastFed, 4) && (
            <p className="mb-4 font-extrabold text-black">Mata mig! 🦦</p>
            )}

            <button
            onClick={handleFeedAnimal}
            disabled={animal.isFed}
            className="mt-6 border px-4 py-1.5 rounded disabled:opacity-60 hover:bg-amber-600 cursor-pointer"
            >Mata Djur</button>

        </main>
    );
}