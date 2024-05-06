import React, { useState } from "react";
import { CustomInput } from "./CustomInput";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export const CustomForm = () => {
  const inputes = [
    {
      label: "Type",
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          value: "",
          label: "----SELECT TYPE----",
        },
        {
          value: "Debit",
          label: "Debit",
        },
        {
          value: "Credit",
          label: "Credit",
        }
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
    <Form>
      {inputes.map((item, i) => (
        <CustomInput key={i} {...item} />
      ))}
      <div className="row">
        <div className="col d-grid">
          {" "}
          <Button type="submit">Add...</Button>
        </div>
      </div>
    </Form>
  );
};
