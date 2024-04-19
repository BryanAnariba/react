import { useState } from "react";
import { AddCategory, GifGrid } from "../components";

export const GifExpertApp = (): JSX.Element => {
  const [categories, setCategories] = useState<string[]>(["One Punch"]);

  const onAddNewCategory = (newCategory: string) => {
    console.log({ newCategory });
    if (categories.includes(newCategory)) return;
    setCategories([newCategory.trim(), ...categories]);
  };

  return (
    <>
      <h1>Gift Expert App</h1>
      <AddCategory onNewCategory={onAddNewCategory} />
      {categories.map((category) => (
        <GifGrid category={category} key={category} />
      ))}
    </>
  );
};
