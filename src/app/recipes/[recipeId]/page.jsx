"use client";

import openDatabase from "@/data/db";
import { useEffect, useState } from "react";

export default function DetailRecipePage({ params }) {
  const [displayedRecipe, setDisplayedRecipe] = useState([]);

  useEffect(() => {
    // Check if database exists and create it if it doesn't exist.
    // Check if the recipe already exists in the database and add it if it doesn't exist.
    async function doDBOperations() {
      const db = await openDatabase();
      const id = parseInt(params.recipeId);
      const taskFromDb = await db.get("recipes", id);

      setDisplayedRecipe(taskFromDb);
    }

    doDBOperations();
  }, []);

  return (
    <div>
      {displayedRecipe && (
        <>
          <h1>{displayedRecipe.title}</h1>
          <p>{displayedRecipe.ingredients}</p>
          <p>{displayedRecipe.cookingInstructions}</p>
        </>
      )}
    </div>
  );
}
