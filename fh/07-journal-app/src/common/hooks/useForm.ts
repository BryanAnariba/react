import { useEffect, useMemo, useState } from "react";

export const useForm =  <T extends {[key: string]: any}, K extends {[key: string]: any}>(initialState: T, formValidations: K) => {
  
  const [formState, setFormState] = useState(initialState);
  const [formValidation, setFormValidation] = useState<{[key: string]: any}>({});

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log({name: event.target.name, value: event.target.value});
    setFormState({
        ...formState, 
        [event.target.name]: event.target.value,
    });
  };

  const createValidators = () => {
    const formCheckValues: {[key: string]: any} = {};
    for (const formField of Object.keys(formValidations)) {
      // console.log(formValidations[formField]);
      const [verifyFieldFn, errorMessage] = formValidations[formField];
      formCheckValues[`${formField}Valid`] = verifyFieldFn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckValues);
  }

  const onReset = (): void => {
    setFormState(initialState);
  }

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialState);
  }, [initialState]);


  const isFormValid = useMemo(() => {
    for (const field of Object.keys(formValidation)) {
      if (formValidation[field] !== null) return false; 
    }
    return true;
  }, [formValidation]);

  return {
    formState,
    onInputChange,
    onReset,
    formValidation,
    isFormValid,
  };
}