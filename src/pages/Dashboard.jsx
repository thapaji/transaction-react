import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { TopNav } from "../components/TopNav";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthComponent } from "../components/AuthComponent";
import { CustomForm } from "../components/CustomForm";
import { getTransactions } from "../helpers/axiosHelper";
import { TransactionTable } from "../components/TransactionTable";
import { CustomModal } from "../components/CustomModal";

const Dashboard = ({ logedInUser }) => {
  // console.log(logedInUser);
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getUserTransactions();
  }, []);

  const getUserTransactions = async () => {
    const { status, message, data } = await getTransactions();
    // console.log(data);
    status === "error" ? toast.error(message) : setTransactions(data);
  };

  return (
    <AuthComponent logedInUser={logedInUser}>
      <TopNav logedInUser={logedInUser} />
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
          <CustomForm getUserTransactions={getUserTransactions} handleClose={handleClose}/>
        </CustomModal>
        <TransactionTable transactions={transactions} />
      </Container>
      <Footer />
    </AuthComponent>
  );
};

export default Dashboard;
