'use client';

import React, {useEffect, useState} from 'react';
import createDatabase from '@/data/db';

export default function AddRecipePage() {
  //const [dbChange, setDbChange] = useState();

  useEffect(() => {
    async function doDBOperations() {
      const db = await createDatabase();

      // Lägg till en bok
      await db.add('recipes', { title: 'Köttfärssås', author: 'Mormor' });

      // Hämta alla böcker
      const recipes = await db.getAll('recipes');
      console.log(recipes);
    }

    doDBOperations();
  }, []);

  return (
    <>
      <h1>Add new recipe</h1>

    </>
  );
}