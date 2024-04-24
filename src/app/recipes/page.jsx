"use client";

import { useEffect, useState } from "react";
import openDatabase from "@/data/db";
import Link from "next/link";

export default function SearchRecipePage() {
  //const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect runs when shouldRunEffect changes
  useEffect(() => {
    // Check if database exists and create it if it doesn't exist.
    // Check if the recipe already exists in the database and add it if it doesn't exist.
    async function doDBOperations() {
      const db = await openDatabase();

      const recipes = await db.getAll("recipes");

      const filteredRecipes = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setDisplayedRecipes(filteredRecipes);
      sessionStorage.setItem("search", searchTerm);
    }

    doDBOperations();
  }, [searchTerm]);

  useEffect(() => {
    const search = sessionStorage.getItem("search");
    if (search) {
      setSearchTerm(search);
    }
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <>
      <h1>All Recipes</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
      />
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
