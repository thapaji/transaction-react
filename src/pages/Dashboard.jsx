import React, { useEffect } from "react";
import { Footer } from "../components/Footer";
import { TopNav } from "../components/TopNav";
import { Container } from "react-bootstrap";
import { AuthComponent } from "../components/AuthComponent";
import { CustomForm } from "../components/CustomForm";

const Dashboard = ({ logedInUser }) => {

  // console.log(logedInUser);
  return (
    <AuthComponent logedInUser={logedInUser}>
      <TopNav logedInUser={logedInUser} />
      <Container className="main pt-5">
        <h4>Dashboard | Welcome {logedInUser?.name}</h4>
        <hr />
        <CustomForm />
      </Container>
      <Footer />
    </AuthComponent>
  );
};

export default Dashboard;
