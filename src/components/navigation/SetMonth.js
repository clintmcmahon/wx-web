import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeMonth } from "../../actions/locations";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Select from 'react-select';

function SetDate() {
  const [selectedMonth, setSelectedMonth] = useState();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const monthOptions = [
    { label: "January", value: "01"},
    { label: "February", value: "02"},
    { label: "March", value: "03"},
    { label: "April", value: "04"},
    { label: "May", value: "05"},
    { label: "June", value: "06"},
    { label: "July", value: "07"},
    { label: "August", value: "08"},
    { label: "September", value: "09"},
    { label: "October", value: "10"},
    { label: "November", value: "11"},
    { label: "December", value: "12"}
  ]

  useEffect(() => {
    let _selectedMonth = null;

    if(state.month)
    {
      _selectedMonth = monthOptions.find((option) => option.value === state.month);
      
    }
    else
    {
      const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
      console.log(month)
      _selectedMonth = monthOptions.find((option) => option.value === month);
    }

    
    setSelectedMonth(_selectedMonth);
    dispatch(changeMonth(_selectedMonth.value));
  }, [])

  const selectedMonthChange = (month) => {
    setSelectedMonth(month)
    dispatch(changeMonth(month.value));
  }

  return (
    <Row>
      <Col xs={12}>
        <Form.Group>
          <Row>
            <Col xs={12}>
            <Form.Label>Select a month</Form.Label>
              <Select
                className="wx-select"
                value={selectedMonth ? selectedMonth : null}
                onChange={selectedMonthChange}
                options={monthOptions ? monthOptions : []}
              />
            </Col>
          </Row>
        </Form.Group>
      </Col>
    </Row>

  );
}

export default SetDate;
