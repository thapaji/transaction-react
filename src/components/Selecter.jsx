import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomInput } from "./CustomInput";

export const Selecter = () => {
  const initialState = {
    filter: "",
    month: "",
    year: "",
    dateFrom: "",
    dateTo: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    formData.userId = localStorage.getItem("user")._id;
    



    
    // const { status, message } = await postNewTransaction(formData);
    // console.log(data);
    // toast[status](message);
    // status === "success" && getUserTransactions() && setShow(false);
    setFormData(initialState);
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <Form className="border p-4 mb-2" onSubmit={handleSubmit}>
      <Row>
        <Col lg={4} md={4}>
          <CustomInput
            label={"Filter By"}
            type={"select"}
            name={"filter"}
            onChange={handleChange}
            options={[
              { value: "month", label: "Filter By Month" },
              { value: "year", label: "Filter By Year" },
              { value: "date", label: "Filter By Date" },
            ]}
          />
        </Col>
        {formData.filter === "month" && (
          <Col lg={4} md={4}>
            <CustomInput
              label={"Month"}
              type={"select"}
              name={"month"}
              onChange={handleChange}
              options={[
                { value: "1", label: "January" },
                { value: "2", label: "February" },
                { value: "3", label: "March" },
                { value: "4", label: "April" },
                { value: "5", label: "May" },
                { value: "6", label: "June" },
                { value: "7", label: "July" },
                { value: "8", label: "August" },
                { value: "9", label: "September" },
                { value: "10", label: "October" },
                { value: "11", label: "November" },
                { value: "12", label: "December" },
              ]}
            />
          </Col>
        )}
        {formData.filter === "year" && (
          <Col lg={4} md={4}>
            <CustomInput
              label={"Year"}
              type={"select"}
              name={"year"}
              onChange={handleChange}
              options={[
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" },
                { value: "2022", label: "2022" },
                { value: "2021", label: "2021" },
              ]}
            />
          </Col>
        )}
        {formData.filter === "date" && (
          <>
            <Col lg={4} md={4}>
              <CustomInput
                label={"From Date"}
                type={"date"}
                name={"dateFrom"}
                onChange={handleChange}
              />
            </Col>
            <Col lg={4} md={4}>
              <CustomInput
                label={"From Date"}
                type={"date"}
                name={"dateTo"}
                onChange={handleChange}
              />
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Col lg={4} md={4}>
          <Button type="submit" variant="primary" disabled={formData.filter === ""}>
            Apply Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
