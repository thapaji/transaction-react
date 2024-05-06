import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { TopNav } from "../components/TopNav";
import { Container } from "react-bootstrap";
import { AuthComponent } from "../components/AuthComponent";
import { CustomForm } from "../components/CustomForm";
import { getTransactions } from "../helpers/axiosHelper";
import { TransactionTable } from "../components/TransactionTable";

const Dashboard = ({ logedInUser }) => {
  // console.log(logedInUser);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getUserTransactions();
  }, []);

  const getUserTransactions = async () => {
    const { status, message, data } = await getTransactions();
    console.log(data);
    status === "error" ? toast.error(message) : setTransactions(data);
  };

  return (
    <AuthComponent logedInUser={logedInUser}>
      <TopNav logedInUser={logedInUser} />
      <Container className="main pt-5">
        <h4>Dashboard | Welcome {logedInUser?.name}</h4>
        <hr />
        <CustomForm getUserTransactions={getUserTransactions} />
        <TransactionTable transactions={transactions} />
      </Container>
      <Footer />
    </AuthComponent>
  );
};

export default Dashboard;
