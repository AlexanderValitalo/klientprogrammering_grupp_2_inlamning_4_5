"use client";

import { useEffect, useState } from "react";
import openDatabase from "@/data/db";
import Link from "next/link";

export default function SearchRecipePage() {
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Filters and displays recipes based on the current search term
  useEffect(() => {
    async function doDBOperations() {
      //Retrieve all recipes from the indexedDB database
      const db = await openDatabase();
      const recipes = await db.getAll("recipes");

      //filter recipes based on the search input
      const filteredRecipes = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setDisplayedRecipes(filteredRecipes); //update displayed recipes with filtered results
      sessionStorage.setItem("search", searchTerm); //store the search term in session storage
    }

    doDBOperations();
  }, [searchTerm]); //run the useEffect when the search term changes

  //Set the search field from sessionStorage
  useEffect(() => {
    const search = sessionStorage.getItem("search");
    if (search) {
      setSearchTerm(search);
    }
  }, []);

  //Set the search term state when the search term changes
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  //JSX rendering of component
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
        {displayedRecipes.length === 0 && <p>{searchTerm} not found</p>}
      </ul>
    </>
  );
}
