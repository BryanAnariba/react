import { useState } from "react";
import { AddCategory, GifGrid } from "./components";

export const GifExpertApp = () => {

  const [categories, setCategories] = useState(['konosuba']);

  const onAddCategory = (newCategory) => {
    console.log(newCategory);
    if (categories.includes(newCategory.toLowerCase())) return;
    setCategories([newCategory.toLowerCase(), ...categories]);
  }
  
  return (
    <div>
      {/* Title */}
      <h1>Gif Expert App</h1>

      {/* Search Input */}
      <AddCategory onNewCategory={(value) => onAddCategory(value)} />

      {/* Gif List */}
      { categories.map(category => (<GifGrid key={category} category={category}/>)) }
    </div>
  );
};
