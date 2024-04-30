import React, { useState } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { CustomInput } from "../components/CustomInput";
import { postNewUser } from "../helpers/axiosHelper";

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [resp, setResp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = formData;

    if (confirmPassword !== rest.password) {
      return alert("Passwords do not match!!!");
    }
    console.log(formData);
    /* Api Call Here*/
    const data = await postNewUser(rest);
    setResp(data);
    if (data.status === "success") {
      setFormData(initialState);
    }
  };

  const inputes = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter Name",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "Phone Number",
      required: true,
    },
  ];
  return (
    <div>
      <TopNav />
      <Container className="main" fluid>
        <Row>
          <Col
            md={6}
            className="bg-info vh-md-100 d-flex justify-content-center align-items-center text-white"
          >
            <div className="shadow-lg rounded p-3">
              <h1>Join Our Community!!!</h1>
              <p>
                Easy to use. Effective to track your finance. One stop to managing your
                accounts!!!!!
              </p>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <div className="shadow-lg p-3 rounded border w-75 mt-5 mb-5">
              <h2>Sign Up Now</h2>
              <hr />
              {resp?.message && (
                <Alert variant={resp?.status === "success" ? "success" : "danger"}>
                  {resp.message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                {inputes.map((item, i) => (
                  // console.log(item);
                  <CustomInput
                    key={i}
                    {...item}
                    value={formData[item.name]}
                    onChange={handleChange}
                  />
                ))}
                <div className="d-grid">
                  <Button type="submit">Sign Up...</Button>
                </div>
              </Form>
              <p className="text-end">
                Already have an account <a href="/signup">Login</a> Now
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Signup;
