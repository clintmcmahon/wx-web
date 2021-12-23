
import Home from "./screens/Home";
import About from "./screens/About";
import TopNav from "./components/navigation/TopNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
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
          <Col xs={12}>
            <div id="content-wrapper" className="d-flex flex-column">
              <Row>
                <Col className="mt-4">
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Home />} />

                  </Routes>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default App;
