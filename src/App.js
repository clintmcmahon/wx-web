import './App.css';
import DailyRecords from './components/dailyrecords/DailyRecords';
import TopNav from "./components/navigation/TopNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <TopNav />
      <Container>
        <Row>
          <Col className="mt-4">
            <DailyRecords />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
