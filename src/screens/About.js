import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h1 className="h3 mb-0 text-gray-800">About</h1>
                </Col>
                <Col xs={12} className="mt-4">
                    <p>This website shows daily a variety of daily and monthly temperature highs, lows and normal ranges from weather stations across the United States. </p>
                    <div className="mt-4">
                    <h3 className="text-gray-800">Planned enhancements</h3>
                        <ul>
                            <li>Daily and monthly precipitation records</li>
                            <li>Daily and monthly snow fall records</li>
                        </ul>
                    </div>
                </Col>
                <Col xs={12} className="mt-4">
                    All the data for this site comes from the <a href="https://www.rcc-acis.org/aboutacis_overview.html" target="_blank" rel="nofollow noreferrer">Regional Climate Centers - Applied Climate Information System</a> and the queries were built using <a href="https://xmacis.rcc-acis.org/" target="_blank" rel="nofollow noreferrer">xmACIS2 Query Builder</a>.
                </Col>
            </Row>
        </>
    )
}

export default About;