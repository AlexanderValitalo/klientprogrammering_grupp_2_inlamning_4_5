"use client";

import React, { useState } from "react";
import openDatabase from "@/data/db";

const feedbackDuration = 3000;

let addedTitle = "";

export default function AddRecipePage() {
  const [recipeExist, setRecipeExist] = useState(false);
  const [addRecipeFeedback, setAddRecipeFeedback] = useState(false);
  const [formData, setFormData] = useState({ title: "", ingredients: "", cookingInstructions: "" });

  const handleCreateClick = async (event) => {
    event.preventDefault();

    const db = await openDatabase();

      const recipes = await db.getAll("recipes");

      let recipeFound = false;

      // Check if the recipe already exists in the database
      recipes.forEach((recipe) => {
        if (recipe.title == formData.title) {
          setRecipeExist(true);
          recipeFound = true;
        }
      });

      if (recipeFound) {
        return;
      }

      // Add the recipe to the database if it doesn't exist
      if (!recipeFound) {
        await db.add("recipes", {
          title: formData.title,
          ingredients: formData.ingredients,
          cookingInstructions: formData.cookingInstructions,
        });
      }
      setAddRecipeFeedback(true);
      addedTitle = formData.title;
    
      setFormData({ title: "", ingredients: "", cookingInstructions: "" });

      setTimeout(() => {
        setAddRecipeFeedback(false);
      }, feedbackDuration);
  }

  function handleChangeForm(event) {
    const fieldName = event.target.name;
    const value = event.target.value;
    
    setFormData({ ...formData, [fieldName]: value });
    
    setRecipeExist(false);
  }

  return (
    <>
      <h1>Add new recipe</h1>

      <form onSubmit={handleCreateClick} onChange={handleChangeForm}>
        <label className="label-style" htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required value={formData.title} onChange={handleChangeForm} /> 

        <label className="label-style" htmlFor="ingredients">Ingredients:</label>
        <textarea id="ingredients" name="ingredients" required value={formData.ingredients} onChange={handleChangeForm} />

        <label className="label-style" htmlFor="cookingInstructions">Cooking instructions:</label>
        <textarea id="cookingInstructions" name="cookingInstructions" required  value={formData.cookingInstructions} onChange={handleChangeForm} />

        <button type="submit">Create recipe</button>
      </form>

      <p>
        {recipeExist && formData.title + " already exists in the cookbook, please choose another title"}
      </p>
      <p>{addRecipeFeedback && addedTitle + " has been added to the cookbook"}</p>
    </>
  );
}