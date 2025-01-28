
import { useState } from "react";
import { AddCategory, GifGrid } from "./modules/gifs/components";

export const GifExpertApp = (): JSX.Element => {

  const [categories, setCategories] = useState<string[]>([]);

  const onReceiveCategory = (value: string): void => {
    if (!categories.includes(value)) setCategories([value, ...categories]);
  }

  return (
    <>
      <h1>Gif Expert App</h1>
      {/* Lo peculiar es que en las props van tanto los elementos que van al hijo como inputs, como eventos que recibe el padre como ouput, onReceiveCategory es de salida */}
      <AddCategory id={'category'} name={'category'} placeholder={'Write Category'} onReceiveCategory={onReceiveCategory} />
      <ol>
        {
          categories.map(category => (
            <GifGrid category={category} key={category} />
          ))
        }
      </ol>
    </>
  );
}
