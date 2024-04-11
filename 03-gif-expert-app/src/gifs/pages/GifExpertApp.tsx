import { useState } from "react";

export const GifExpertApp = (): JSX.Element => {
  const [categories, setCategories] = useState<string[]>([
    "One Punch",
    "Dragon Ball",
  ]);

  const addCategory = (cat: string): void => {
    setCategories([...categories, cat]);
  }

  return (
    <>
      <h1>Gift Expert App Works</h1>

      <ol>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ol>
    </>
  );
};
