import reactLogo from "./assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementBy, RootState } from "./store";
import "./App.css";

function App(): JSX.Element {
  const counter = useSelector((state: RootState) => state.counter.counter);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{counter}</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())} style={{marginLeft: 5}}>
          + 1
        </button>
        <button onClick={() => dispatch(decrement())} style={{marginLeft: 5}}>
          - 1
        </button>
        <button onClick={() => dispatch(incrementBy(2))} style={{marginLeft: 5}}>
          + 2
        </button>
      </div>
    </>
  );
}

export default App;
