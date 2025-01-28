import React, { useState } from "react";

interface Props {
  name: string;
  id: string;
  placeholder: string;
  onReceiveCategory: (value: string) => void;
}

export const AddCategory = ({ name, id, placeholder, onReceiveCategory }: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('======> handle submit executed from AddCategory.test.tsx <======');
    if (inputValue.trim().length !== 0) {
      onReceiveCategory(inputValue.trim().toUpperCase()); // Este es de salida se emite al padre cuando se de enter, peculiar
      setInputValue('');
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="form">
      <input type="text" name={name} id={id} placeholder={placeholder} value={inputValue} onChange={onInputChange} />
    </form>
  )
}
