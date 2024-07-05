import { useState } from "react";

export const AddCategory = ({onNewCategory}) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    // console.log({onChangeValue: e.target.value});
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log('Category Added: ', {inputValue});
    if (inputValue.trim().length <= 1) return;

    // Es como emitir el evento al padre de angular pero emitimos el valor del input al padre
    onNewCategory(inputValue)
    setInputValue('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search Gifs..."
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};
