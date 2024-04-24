"use client";

import React, { useEffect, useState } from "react";
import openDatabase from "@/data/db";

const feedbackDuration = 2000;

export default function AddRecipePage() {
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const [recipeExist, setRecipeExist] = useState(false);
  const [incorectInput, setIncorectInput] = useState(false);
  const [addRecipeFeedback, setAddRecipeFeedback] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [ingredientsValue, setIngredientsValue] = useState("");
  const [cookingInstructionsValue, setCookingInstructionsValue] = useState("");

  // useEffect runs when shouldRunEffect changes
  useEffect(() => {
    if (!shouldRunEffect) {
      return;
    }

    // Check if database exists and create it if it doesn't exist.
    // Check if the recipe already exists in the database and add it if it doesn't exist.
    async function doDBOperations() {
      const db = await openDatabase();

      const recipes = await db.getAll("recipes");

      let recipeFound = false;

      // Check if the recipe already exists in the database
      recipes.forEach((recipe) => {
        if (recipe.title == titleValue) {
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
          title: titleValue,
          ingredients: ingredientsValue,
          cookingInstructions: cookingInstructionsValue,
        });
      }
      setAddRecipeFeedback(
        true
      ); /*************************************************************************** */
      setTitleValue("");
      setIngredientsValue("");
      setCookingInstructionsValue("");
    }

    doDBOperations();

    setShouldRunEffect(false);
  }, [shouldRunEffect]);

  function handleCreateClick() {
    if (titleValue != "" && ingredientsValue != "" && cookingInstructionsValue != "") {
      setShouldRunEffect(true);
      setIncorectInput(false);

      setTimeout(() => {
        setAddRecipeFeedback(false);
      }, feedbackDuration);
    } else {
      setIncorectInput(true);
    }
  }

  function handleChangeTitle(event) {
    setTitleValue(event.target.value);
    setRecipeExist(false);
  }

  function handleChangeIngredients(event) {
    setIngredientsValue(event.target.value);
    setRecipeExist(false);
  }

  function handleChangeCookingInstructions(event) {
    setCookingInstructionsValue(event.target.value);
    setRecipeExist(false);
  }

  let titleInput = <input type="text" required value={titleValue} onChange={handleChangeTitle} />;

  let ingredientsInput = (
    <textarea required value={ingredientsValue} onChange={handleChangeIngredients} />
  );

  let cookingInstructions = (
    <textarea
      required
      value={cookingInstructionsValue}
      onChange={handleChangeCookingInstructions}
    />
  );

  return (
    <>
      <h1>Add new recipe</h1>
      {titleInput}
      {ingredientsInput}
      {cookingInstructions}
      <button onClick={handleCreateClick}>Create recipe</button>
      <p>
        {recipeExist && titleValue + " already exists in the cookbook, please choose another title"}
      </p>
      <p>{addRecipeFeedback && titleValue + " has been added to the cookbook"}</p>
      {incorectInput && <p>All fields must be filled in.</p>}
    </>
  );
}
