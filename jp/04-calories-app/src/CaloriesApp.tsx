import { useEffect, useReducer } from "react";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { activityReducer, initialState } from "./reducers/activity.reducers";
import ActivityList from "./components/ActivityList";
import CaloryTracker from "./components/CaloryTracker";

const CaloriesApp = (): JSX.Element => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
      <Header state={state} dispatch={dispatch} />
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CaloryTracker activities={state.activities}/>
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
};

export default CaloriesApp;
