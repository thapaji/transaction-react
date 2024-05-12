import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { TopNav } from "../components/TopNav";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthComponent } from "../components/AuthComponent";
import { CustomForm } from "../components/CustomForm";
import { TransactionTable } from "../components/TransactionTable";
import { CustomModal } from "../components/CustomModal";
import { useUser } from "../userContext";
import { TransactionCharts } from "../components/TransactionCharts";
import { Selecter } from "../components/Selecter";

const Dashboard = () => {
  const { logedInUser, transactions } = useUser();
  // console.log(transactions);

  return (
    <AuthComponent>
      <TopNav />
      <Container className="main pt-5">
        <h4>Dashboard | Welcome {logedInUser?.name}</h4>
        <hr />
        <CustomModal title={"Add New Transaction"}>
          {" "}
          <CustomForm />
        </CustomModal>
        <Selecter />
        <div>{transactions.length} transactions found</div>
        <TransactionCharts key={transactions.length} />
        <TransactionTable />
      </Container>
      <Footer />
    </AuthComponent>
  );
};

export default Dashboard;
