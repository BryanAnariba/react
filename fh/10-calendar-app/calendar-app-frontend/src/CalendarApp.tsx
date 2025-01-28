import { BrowserRouter } from "react-router"
import { AppRouter, store } from "./core"
import { Provider } from "react-redux"

export const CalendarApp = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
