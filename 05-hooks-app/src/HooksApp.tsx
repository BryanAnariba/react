import { CounterApp } from "./01-use-state/CounterApp";
import { CounterWithCustomHook } from "./01-use-state/CounterWithCustomHook";
import { SimpleForm } from "./02-use-effect/SimpleForm";

export const HooksApp = (): JSX.Element => {
  return (
    <>
      <h3 className="text-danger">Hooks App</h3>
      <CounterApp />
      <CounterWithCustomHook />
      <SimpleForm />
    </>
  );
};
