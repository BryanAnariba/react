import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../../src/hooks/useForm";
import { SyntheticEvent } from "react";

interface ChangeEvent<T = HTMLInputElement> extends SyntheticEvent<T> {
    target: EventTarget & T;
}

describe("Testing in useForm.ts", () => {
  test("Should to return the deafult form values.", () => {
    const initialFormValues = { 
        name: "Goku", 
        email: "goku@gmail.com" 
    };
    const { result } = renderHook(() => useForm(initialFormValues));
    const { formState, onInputChange, onReset } = result.current;
    expect(formState).toEqual(initialFormValues);
    expect(onInputChange).toEqual(expect.any(Function));
    expect(onReset).toEqual(expect.any(Function));
  });

  test('Should to change the name form', () => {
    const initialFormValues = { 
        name: "Goku", 
        email: "goku@gmail.com" 
    };

    const { result } = renderHook(() => useForm(initialFormValues));
    const { onInputChange } = result.current;
    const event = {
        target: {
          name: 'name',
          value: 'Gohan'
        }
      } as React.ChangeEvent<HTMLInputElement>;
    act(() => {
        onInputChange(event);
    });
    expect(result.current.formState).toEqual({...initialFormValues, name: 'Gohan'});
  });

  test('Should to reset the form', () => {
    const initialFormValues = { 
        name: "Goku", 
        email: "goku@gmail.com" 
    };

    const { result } = renderHook(() => useForm(initialFormValues));
    const { onReset } = result.current;
    act(() => {
        onReset();
    });
    expect(result.current.formState).toEqual(initialFormValues);
  })
});
