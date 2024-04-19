import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  onNewCategory: (value: string) => void
}

export const AddCategory = ({onNewCategory}: Props): JSX.Element => {
  const [category, setCategory] = useState<string>("");

  const addNewCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.trim().length !== 0) {
      onNewCategory(category)
    } else {
      onNewCategory('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  return (
    <form onSubmit={(e) => addNewCategory(e)}>
      <input
        type="text"
        name="category"
        id="category"
        placeholder="Search gifs"
        value={category}
        onChange={handleInputChange}
      />
      <button type="submit">Add Category</button>
    </form>
  );
};
