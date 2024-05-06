import React, { useState } from "react";
import { CustomInput } from "./CustomInput";
import { Button, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

export const CustomForm = () => {
  const initialState = {
    type: "",
    title: "",
    amount: "-----Select category-----",
    date: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialState);
  };
  const handleReset = () => {
    setFormData(initialState);
  };

  const inputes = [
    {
      label: "Type",
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          value: "Income",
          label: "Income",
        },
        {
          value: "Expenses",
          label: "Expenses",
        },
      ],
    },
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Enter Title",
      required: true,
    },
    {
      label: "Amount",
      name: "amount",
      type: "number",
      placeholder: "Amount",
      required: true,
    },
    {
      label: "Date",
      name: "date",
      type: "Date",
      placeholder: "Enter Transaction Date",
    },
  ];
  return (
    <Form className="shadow-lg p-3 boarder rounded" onSubmit={handleSubmit}>
      <Row>
        {inputes.map((item, i) => (
          <Col md={6} key={i}>
            <CustomInput {...item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={6} className="d-grid">
          {" "}
          <Button type="submit" onChange={handleChange}>
            Add...
          </Button>
        </Col>
        <Col md={6} className="d-grid">
          {" "}
          <Button type="submit" variant="info" onClick={handleReset}>
            Reset...
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
