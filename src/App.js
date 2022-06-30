
import RootNavigator from "./components/navigation/RootNavigator";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import "./sb-admin-2.min.css";
import './App.css';
import store from './store/store';
import { Provider } from 'react-redux';
function App() {
  return (
    <div id="wrapper">
      <Provider store={store}>
          <RootNavigator />
      </Provider>
    </div >
  );
}

export default App;
