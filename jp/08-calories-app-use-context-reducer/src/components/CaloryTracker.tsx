import CaloryDisplay from "./CaloryDisplay";
import useActivity from "../hooks/useActivity";

export default function CaloryTracker(): JSX.Element {
  const { consumedCalories, burnedCalories, differenceCalories } =
    useActivity();

  return (
    <>
      <h2 className="text-4xl font-bold text-white text-center">
        Calories resume:
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloryDisplay text="Consumed" calories={consumedCalories} />
        <CaloryDisplay text="Burned" calories={burnedCalories} />
        <CaloryDisplay text="Difference Calies" calories={differenceCalories} />
      </div>
    </>
  );
}
