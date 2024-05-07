import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { TopNav } from "../components/TopNav";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthComponent } from "../components/AuthComponent";
import { CustomForm } from "../components/CustomForm";
import { TransactionTable } from "../components/TransactionTable";
import { CustomModal } from "../components/CustomModal";
import { useUser } from "../userContext";

const Dashboard = () => {
  const { setLogedInUser, logedInUser } = useUser();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <AuthComponent>
      <TopNav  />
      <Container className="main pt-5">
        <h4>Dashboard | Welcome {logedInUser?.name}</h4>
        <hr />
        <Row>
          <Col>
            <Button variant="primary" onClick={handleShow}>
              Add New Transaction
            </Button>
          </Col>
        </Row>
        <CustomModal title={"Add New Transaction"} handleClose={handleClose} show={show}>
          {" "}
          <CustomForm handleClose={handleClose}/>
        </CustomModal>
        <TransactionTable />
      </Container>
      <Footer />
    </AuthComponent>
  );
};

export default Dashboard;
