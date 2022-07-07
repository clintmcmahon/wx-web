import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDate } from "../../actions/locations";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Select from 'react-select';
import DatePicker from "react-datepicker";

function SetDate() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const selectedDateChange = (date) => {
    setSelectedDate(date)
    dispatch(changeDate(date));
  }

  return (
    <Row>
      <Col xs={12}>
        <Form.Group controlId="formBasicEmail">
          <Row>
            <Col xs={12}>
              <Form.Label>Choose a day or month</Form.Label>
              <DatePicker
                className="form-control"
                selected={selectedDate}
                onChange={selectedDateChange}
              />
            </Col>
          </Row>
        </Form.Group>
      </Col>
    </Row>

  );
}

export default SetDate;
