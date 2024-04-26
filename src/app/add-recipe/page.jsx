"use client";

import React, { useState } from "react";
import openDatabase from "@/data/db";
import styles from "./page.module.css";

const feedbackDuration = 3000;
let addedTitle = "";

export default function AddRecipePage() {
  const [recipeExist, setRecipeExist] = useState(false);
  const [addRecipeFeedback, setAddRecipeFeedback] = useState(false);
  const [formData, setFormData] = useState({ title: "", ingredients: "", cookingInstructions: "" });

  //Handles form submission
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
      return; //If a recipe with this title already exists, exit function
    }

    // Add the recipe to the database if it doesn't exist
    if (!recipeFound) {
      await db.add("recipes", {
        title: formData.title,
        ingredients: formData.ingredients,
        cookingInstructions: formData.cookingInstructions,
      });
    }
    setAddRecipeFeedback(true); //set state to display feedback for added recipe
    addedTitle = formData.title; //store title of added recipe for feedback display
  
    setFormData({ title: "", ingredients: "", cookingInstructions: "" });

    //Timer hides feedback message after the set feedbackDuration time
    setTimeout(() => {
      setAddRecipeFeedback(false);
    }, feedbackDuration);
  }

  //Handles changes in the form fields
  function handleChangeForm(event) {
    const fieldName = event.target.name;
    const value = event.target.value;
    
    //Updates form data with the new value
    setFormData({ ...formData, [fieldName]: value }); 
    
    setRecipeExist(false);
  }

  //JSX rendering of component
  return (
    <>
      <h1>Add new recipe</h1>

      <form className={styles.form} onSubmit={handleCreateClick} onChange={handleChangeForm}>
        <label htmlFor="title">Title</label>
        <input className={styles.input} type="text" id="title" name="title" placeholder="Title..." required value={formData.title} onChange={handleChangeForm} /> 

        <label className={styles.label} htmlFor="ingredients">Ingredients</label>
        <textarea className={styles.textarea} id="ingredients" name="ingredients" placeholder="Ingredients..." required value={formData.ingredients} onChange={handleChangeForm} />

        <label className={styles.label} htmlFor="cookingInstructions">Cooking instructions</label>
        <textarea className={styles.textarea} id="cookingInstructions" name="cookingInstructions" placeholder="Cooking instructions..." required  value={formData.cookingInstructions} onChange={handleChangeForm} />

        <button className={styles.button} type="submit">Create recipe</button>
      </form>

      <p>
        {recipeExist && formData.title + " already exists in the cookbook, please choose another title"}
      </p>
      <p>{addRecipeFeedback && addedTitle + " has been added to the cookbook"}</p>
    </>
  );
}