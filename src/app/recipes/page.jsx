"use client";

import { useEffect, useState } from "react";
import createDatabase from "@/data/db";
import Link from "next/link";

export default function SearchRecipePage() {
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  // useEffect runs when shouldRunEffect changes
  useEffect(() => {
    // Check if database exists and create it if it doesn't exist.
    // Check if the recipe already exists in the database and add it if it doesn't exist.
    async function doDBOperations() {
      const db = await createDatabase();

      const recipes = await db.getAll("recipes");

      setDisplayedRecipes(recipes);
    }

    doDBOperations();

    setShouldRunEffect(false);
  }, [shouldRunEffect]);

  return (
    <>
      <h1>All Recipes</h1>
      <ul>
        {displayedRecipes.map((recipe) => (
          <li key={recipe.id}>
            <Link href={"/recipes/" + recipe.id}>
              <h2>{recipe.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
