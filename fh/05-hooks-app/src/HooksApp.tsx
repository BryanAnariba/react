// import { CounterApp } from "./01-use-state/CounterApp";
// import { CounterWithCustomHook } from "./01-use-state/CounterWithCustomHook";
// import { SimpleForm } from "./02-use-effect/SimpleForm";
// import { FormWithCustomHook } from "./02-use-effect/FormWithCustomHook";
// import { MultipleCustomHooks } from "./03-examples/MultipleCustomHooks";
// import { FocusScreen } from "./04-use-ref/FocusScreen";
// import { Memorize } from "./06-memorize/Memorize";
// import { MemorizeHook } from "./06-memorize/MemorizeHook";
// import { UseCallbackHook } from "./06-memorize/UseCallbackHook";
// import { Padre } from "./07-tarea-memo/Padre";
// import './08-use-reducer/intro-reducer';
 import { TodoApp } from './08-use-reducer/TodoApp';


export const HooksApp = (): JSX.Element => {
  return (
    <>
      <h3 className="text-danger">Hooks App</h3>
      {/* <CounterApp />
      <CounterWithCustomHook />
      <SimpleForm /> 
      <FormWithCustomHook />
      <MultipleCustomHooks /> 
      <FocusScreen /> 
      <Memorize /> 
      <MemorizeHook /> 
      <UseCallbackHook /> 
      <Padre /> */}
      <TodoApp />
    </>
  );
};
