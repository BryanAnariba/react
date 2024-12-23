import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router';
import { AppRouter } from './router/AppRouter';
import './App.css';

function InventoryApp (): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default InventoryApp;
