import React from "react";
import { Table } from "react-bootstrap";

export const TransactionTable = ({ transactions }) => {
//   console.log(transactions);
  const total = transactions.reduce((acc, item) => {
    return item.type === "Income" ? acc + item.amount : acc - item.amount;
  }, 0);
  return (
    <>
      <div>{transactions.length} transactions found</div>{" "}
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
              <td>{item.date.slice(0, 10)}</td>
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
    </>
  );
};
