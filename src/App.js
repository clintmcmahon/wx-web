
import Home from "./screens/Home";
import About from "./screens/About";
import TopNav from "./components/navigation/TopNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sb-admin-2.min.css";
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <TopNav />
      <Container>
        <Row>
          <Col className="mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
