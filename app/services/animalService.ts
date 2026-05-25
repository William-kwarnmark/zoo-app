import { Animal } from "../models/Animal";
import { hrsPassed } from "./timeService";

const API_URL = "https://animals.azurewebsites.net/api/animals";
const STORAGE_KEY = "animals";

export async function getAnimals(): Promise<Animal[]> {
    const storedAnimals = localStorage.getItem(STORAGE_KEY);

    if (storedAnimals) {
        return JSON.parse(storedAnimals);
    }

    const response = await fetch(API_URL);

    const animals: Animal[] = await response.json();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));

    return animals;
}

export async function getAnimalById (
    id: number
): Promise<Animal | undefined> {
    const animals = await getAnimals();

   const animal = animals.find((animal) => animal.id === id);

   if (!animal) {
    return undefined;
   }

   const updatedAnimal = resetAnimalFeedingIfNeeded(animal);

   if (updatedAnimal.isFed !== animal.isFed) {
    const updatedAnimals = animals.map((animal) =>
    animal.id === id ? updatedAnimal : animal
);

localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnimals));
   }
   return updatedAnimal;
}

export function feedAnimal(id:number) {
    const animals: Animal[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const updatedAnimals = animals.map((animal) => {
        if (animal.id === id) {
            return {
                ...animal,
                isFed: true,
                lastFed: new Date().toISOString(),
            };
        }
        return animal;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnimals));
}

export function resetAnimalFeedingIfNeeded(animal: Animal): Animal {
    if (animal.isFed && hrsPassed(animal.lastFed, 3)) {
        return {
            ...animal,
            isFed: false,
        };
    }
    return animal;
}