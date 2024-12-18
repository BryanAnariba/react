import { Provider } from 'react-redux';
import './App.css';
import { store } from './store';

function InventoryApp (): JSX.Element {
  return (
    <Provider store={store}>
      <span>App Works!!!</span>
    </Provider>
  )
}

export default InventoryApp;
