import { useState } from "react";

export const useForm =  <T extends object>(initialState: T) => {
  const [formState, setFormState] = useState(initialState);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log({name: event.target.name, value: event.target.value});
    setFormState({
        ...formState, 
        [event.target.name]: event.target.value,
    });
  };

  const onReset = (): void => {
    setFormState(initialState);
  }
  return {
    formState,
    onInputChange,
    onReset,
  };
}