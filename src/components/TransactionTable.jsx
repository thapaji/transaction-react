import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useUser } from "../userContext";
import { deleteTransactions } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

export const TransactionTable = () => {
  const { transactions, getUserTransactions, setShow } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  const handleOnCheckBox = (e) => {
    const { checked, value } = e.target;
    // console.log(checked, value);
    if (value === "all") {
      checked ? setIdsToDelete(transactions.map((trans) => trans._id)) : setIdsToDelete([]);
      return;
    }

    if (checked) {
      setIdsToDelete([...idsToDelete, value]);
    } else {
      setIdsToDelete(idsToDelete.filter((id) => id !== value));
    }
  };

  useMemo(() => {
    getUserTransactions();
  }, []);

  const total = transactions.reduce((acc, item) => {
    return item.type === "Income" ? acc + item.amount : acc - item.amount;
  }, 0);

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you want to delete ${idsToDelete.length} many transactions?`)
    ) {
      const { status, message } = await deleteTransactions(idsToDelete);
      toast[status](message);

      if (status === "success") {
        getUserTransactions();
      }
    }
  };

  return (
    <>
      <div className="f-flex justify-context-between">
        <div>{transactions.length} transactions found</div>
        //have a components called here
        <div className="border shadow p-3 rounded mt-2">
          <div className="border shadow p-3 rounded mb-4">
            <Row>
              <h2>Transactions</h2>
            </Row>
            <Row>
              <Col lg={2} md={3}>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Add New Transaction
                </Button>
              </Col>
              <Col lg={2} md={3}>
                <Button variant="danger" onClick={handleDelete} disabled={!idsToDelete.length}>
                  Delete {idsToDelete.length} Transactions
                </Button>
              </Col>
            </Row>
          </div>
          <div>
            <Form.Check
              onChange={handleOnCheckBox}
              value="all"
              type="checkbox"
              label="Select All"
              checked={transactions.every((item) => idsToDelete.includes(item._id))}
            />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Income</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Form.Check
                      value={item._id}
                      onChange={handleOnCheckBox}
                      type="checkbox"
                      label={item.date.slice(0, 10)}
                      checked={idsToDelete.includes(item._id)}
                    ></Form.Check>
                  </td>
                  <td>{item.title}</td>
                  {item.type === "Income" ? (
                    <>
                      <td>{item.amount}</td>
                      <td></td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td>{item.amount}</td>
                    </>
                  )}
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="fw-bold">
                  Total Balance
                </td>
                <td className={total < 1 ? "text-danger" : "text-success"}>{total}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
