import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Activity } from "../interfaces/activity.interface";
import { ActivityActions, ActivityState } from "../reducers/activity.reducers";
import { categories } from "../constants/category.constants";


const initialState: Activity = {
  id: uuid(),
  category: 1,
  name: "",
  calories: 0,
};

interface FormProps {
  dispatch: React.Dispatch<ActivityActions>;
  state: ActivityState;
}

export function Form({ dispatch, state }: FormProps): JSX.Element {
  const [activity, setActivity] = useState<Activity>(initialState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // console.log(e.target.value);
    const isNumberFields: boolean = ["category", "calories"].includes(
      e.target.id
    );
    setActivity({
      ...activity,
      [e.target.id]: isNumberFields ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = (): boolean => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Saving activity: ", activity);
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuid() });
  };

  //  Al dar click en una actividad se activa y se rellena el formulario
  useEffect(() => {
    if (state.activeActivityId.trim() !== '') {
      // console.log('Activity Founded!');
      const selectedActivity = state.activities.filter(activity => activity.id === state.activeActivityId)[0];
      setActivity(selectedActivity);
    }
  }, [state.activeActivityId, state.activities]); // No Warning
  // }, [state.activeActivityId]); Warning

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.id} :: {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name">Activity: </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: Meals=Cake, Oranje Juice, Pizza Exercice=Push Ups, Abs, Running."
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories">Calories: </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: 300 | 500."
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value={activity.category === 1 ? "Save Meal" : "Save Exercise"}
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase cursor-pointer text-white disabled:opacity-60"
        disabled={!isValidActivity()}
      />
      {/* <pre>{JSON.stringify(activity)}</pre> */}
    </form>
  );
}
