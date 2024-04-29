import React, { useState } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { CustomInput } from "../components/CustomInput";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(email, password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    /* Api Call Here*/
    setFormData(initialState);
  };

  const inputes = [
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
  ];
  return (
    <div>
      {/* header */}
      <TopNav />
      <Container className="main" fluid>
        <Row>
          <Col
            md={6}
            className="bg-info vh-md-100 d-flex justify-content-center align-items-center text-white"
          >
            <div className="shadow-lg rounded p-3">
              <h1>Welcome Back !!!</h1>
              <p>Login to your account and take control your finance.</p>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <div className="shadow-lg p-3 rounded border w-75 mt-5 mb-5">
              <h2>Login Now</h2>
              <hr />
              <Form onSubmit={handleSubmit}>
                {inputes.map((item, i) => (
                  // console.log(item);
                  <CustomInput key={i} {...item} onChange={handleChange}/>
                ))}
                <div className="d-grid">
                  <Button type="submit">Login...</Button>
                </div>
              </Form>
              <p className="text-end">
                Are you new? <a href="/signup">Signup</a> Now
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;