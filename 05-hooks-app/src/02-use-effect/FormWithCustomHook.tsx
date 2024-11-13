import { useEffect } from "react";
import { Message } from "./Message";
import { useForm } from "../hooks";

interface FormState {
  userName: string;
  email: string;
  password: string;
}

const formFields: FormState = {
  userName: '',
  email: '',
  password: ''
}

export const FormWithCustomHook = (): JSX.Element => {

  const {formState, onInputChange, onReset} = useForm(formFields);
  const {userName, email, password} = formState;

  useEffect(() => {
    console.log('Use effect called!');
  }, []);

  useEffect(() => {
    console.log('Form state change!');
  }, [formState]);

  return (
    <>
      <h1>Custom Form</h1>
      <input
        type="text"
        name="userName"
        id="userName"
        className="form-control"
        placeholder="Write userName"
        value={userName}
        onChange={onInputChange}
      />
      <input
        type="email"
        name="email"
        id="email"
        className="form-control mt-3"
        placeholder="Write email"
        value={email}
        onChange={onInputChange}
      />
      <input
        type="password"
        name="password"
        id="password"
        className="form-control mt-3"
        placeholder="Write password"
        value={password}
        onChange={onInputChange}
      />
      <button className="btn btn-primary mt-2" onClick={onReset}>
        Reset Form
      </button>
      <br />
      {
        userName === 'strider' && <Message />
      }
      <hr />
    </>
  );
};
