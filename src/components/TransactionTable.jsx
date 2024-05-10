import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useUser } from "../userContext";
import { deleteTransactions } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

export const TransactionTable = () => {
  const { transactions, getUserTransactions } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect;

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

  useEffect(() => {
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
        <Button variant="danger" onClick={handleDelete} disabled={!idsToDelete.length}>
          Delete {idsToDelete.length} Transactions
        </Button>
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
    </>
  );
};
