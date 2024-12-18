import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./modules/router/AppRouter";
import { store } from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
