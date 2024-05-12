import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { useUser } from "../userContext";

export const Selecter = () => {
  const initialState = {
    filter: "",
    month: "",
    year: "",
    dateFrom: "",
    dateTo: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { getUserTransactions } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.userId = localStorage.getItem("user")._id;

    /************    Initialise filter dates  ****************/
    let fromDate, toDate;

    if (formData.filter === "month") {
      const month = formData.month.padStart(2, "0"); // Ensure two-digit month format
      fromDate = `2024/${month}/01`;
      toDate = `2024/${month}/31`;
    } else if (formData.filter === "year") {
      const year = formData.year;
      fromDate = `${year}/01/01`;
      toDate = `${year}/12/31`;
    } else if (formData.filter === "date") {
      fromDate = formData.dateFrom;
      toDate = formData.dateTo;
    }

    const filter = {};
    if (fromDate && toDate) {
      filter.fromDate = fromDate;
      filter.toDate = toDate;
    }
    // console.log(filter);
    getUserTransactions(filter);
    // setFormData(initialState);
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <Form className="border p-4 mb-2 shadow-lg rounded" onSubmit={handleSubmit}>
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
