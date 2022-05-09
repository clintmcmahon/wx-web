import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function About() {
  return (
    <>
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="h3 mb-0 text-gray-800">About</h1>
        </Col>
        <Col xs={12} className="mt-2">
          <p>
            the data on the site displays daily and monthly temperature highs,
            lows and normal ranges from weather stations across the United
            States. As time allows I will add more and more data points to the
            site.
          </p>
        </Col>
        <Col xs={12} className="mt-2">
          <h3 className="text-gray-800">Contact</h3>
          Feel free to email me with bug reports, feature requests or if you
          found any inaccurate data at{" "}
          <a href="mailto:clint@cmcmahon.io?subject=Hello, weather nerd">
            clint@cmcmahon.io
          </a>
          .
        </Col>
        <Col xs={12} className="mt-2">
          <h3 className="text-gray-800">Planned enhancements</h3>
          <ul>
            <li>Daily and monthly precipitation records</li>
            <li>Daily and monthly snow fall records</li>
          </ul>
        </Col>
        <Col xs={12} className="mt-2">
          <h3 className="text-gray-800">Data sources</h3>
          All the data for this site comes from the{" "}
          <a
            href="https://www.rcc-acis.org/aboutacis_overview.html"
            target="_blank"
            rel="nofollow noreferrer"
          >
            Regional Climate Centers - Applied Climate Information System
          </a>{" "}
          and the queries were built using{" "}
          <a
            href="https://xmacis.rcc-acis.org/"
            target="_blank"
            rel="nofollow noreferrer"
          >
            xmACIS2 Query Builder
          </a>
          . The stations listed are the different ThreadEx, which stands for
          Threaded Extremes, stations that take weather data recorded at
          National Weather Service Automated Surface Observing Stations (ASOS)
          and merges it together with other nearby data to create a single data
          set of weather information. To learn more about ThreadEx, visit the{" "}
          <a
            href="http://threadex.rcc-acis.org/help/about.html"
            target="_blank"
            rel="nofollow noreferrer"
          >
            project background page
          </a>
          .
        </Col>
      </Row>
    </>
  );
}

export default About;
