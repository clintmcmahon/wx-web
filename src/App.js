
import RootNavigator from "./components/navigation/RootNavigator";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import "./sb-admin-2.min.css";
import './App.css';
import store from './store/store';
import { Provider } from 'react-redux';
import TopNav from "./components/navigation/TopNav";
import Container from 'react-bootstrap/Container';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <TopNav />
            <Container>
        <RootNavigator />
        </Container>
      </Provider>
    </div >
  );
}

export default App;
