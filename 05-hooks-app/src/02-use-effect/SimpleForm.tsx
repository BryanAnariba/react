import { useEffect, useState } from "react";
import { Message } from "./Message";

interface FormState {
  userName: string;
  email: string;
}

export const SimpleForm = () => {
  const [formState, setFormState] = useState<FormState>({
    userName: "Goku",
    email: "goku@gmail.com",
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log({name: event.target.name, value: event.target.value});
    setFormState({
        ...formState, 
        [event.target.name]: event.target.value,
    });
  };

  const { userName, email } = formState;

  useEffect(() => {
    console.log('Use effect called!');
  }, []);

  useEffect(() => {
    console.log('Form state change!');
  }, [formState]);

  return (
    <>
      <h1>Simple Form</h1>
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
      <hr />

      {
        userName === 'strider' && <Message />
      }
    </>
  );
};
