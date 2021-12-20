import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
    return (
        <>
        <Row>
            <Col xs={12}>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">About</h1>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs={12} className="mt-4">
                The data for this website is sourced from the <a href="https://www.rcc-acis.org/aboutacis_overview.html" target="_blank" rel="nofollow noreferrer">Regional Climate Centers - Applied Climate Information System</a> and the queries were built using <a href="https://xmacis.rcc-acis.org/" target="_blank" rel="nofollow noreferrer">xmACIS2 Query Builder</a>.
            </Col>
        </Row>
        </>
    )
}

export default About;