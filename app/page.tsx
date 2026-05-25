"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Animal } from "./models/Animal";
import { getAnimals } from "./services/animalService";
import { hrsPassed } from "./services/timeService";

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    async function loadAnimals() {
      const data = await getAnimals();
      setAnimals(data);
    }

    loadAnimals();
  }, []);

  return (
    <main className="p-8 text-yellow-300">
      <h1 className="text-4xl font-bold mb-8">The Zoo</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <article key={animal.id} className="border p-4 rounded">
            <img src={animal.imageUrl} alt={animal.name}
            onError={(event) => {
              event.currentTarget.src = "/placeholder-animal.png";
            }}
            
            className="w-full h-64 object-contain rounded mb-4"></img>
            <h2 className="text-2xl font-semibold mb-2">{animal.name}</h2>
            <p className="mb-4">{animal.shortDescription}</p>

            {hrsPassed(animal.lastFed, 4) && (
            <p className="mb-4 font-extrabold text-black">Mata mig! 🦦</p>
            )}
            <Link href={`/animals/${animal.id}`} className="underline">
              Läs mer
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
