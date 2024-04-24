"use client";

import createDatabase from "@/data/db";
import { useEffect, useState } from "react";

export default function DetailRecipePage({ params }) {
  const [displayedRecipe, setDisplayedRecipe] = useState([]);

  useEffect(() => {
    // Check if database exists and create it if it doesn't exist.
    // Check if the recipe already exists in the database and add it if it doesn't exist.
    async function doDBOperations() {
      let db;
      const request = await createDatabase(); //indexedDB.open("MyDatabase", 1);
      request.onsuccess = function (event) {
        db = request.result;
        const transaction = db.transaction(["recipes"]);
        const objectStore = transaction.objectStore("recipes");
        const request = objectStore.get(params.recipeId);
        request.onsuccess = function (event) {
          const recipe = request.result;
          setDisplayedRecipe(recipe);
          console.log(recipe);
        };
      };
    }

    doDBOperations();
  }, []);

  return (
    <div>
      <h1>Recipe Detail</h1>
      {displayedRecipe.map((recipe) => (
        <p>{recipe.title}</p>
      ))}
    </div>
  );
}
