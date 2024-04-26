"use client";

import openDatabase from "@/data/db";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function DetailRecipePage({ params }) {
  const [displayedRecipe, setDisplayedRecipe] = useState([]);

  useEffect(() => {
    async function doDBOperations() {
      const db = await openDatabase();
      const id = parseInt(params.recipeId);
      const taskFromDb = await db.get("recipes", id);

      setDisplayedRecipe(taskFromDb);
    }

    doDBOperations();
  }, []);

  return (
    <div className={styles.recipeDiv}>
      {displayedRecipe && (
        <>
          <h1>{displayedRecipe.title}</h1>
          <h2 className={styles.h2}>Ingredients</h2>
          <p className={styles.p}>{displayedRecipe.ingredients}</p>
          <h2 className={styles.h2}>Cooking instructions</h2>
          <p>{displayedRecipe.cookingInstructions}</p>
        </>
      )}
    </div>
  );
}
