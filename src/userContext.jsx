import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTransactions } from "./helpers/axiosHelper";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [logedInUser, setLogedInUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["Incomes", "Expenses"],
    datasets: {
      label: "N/A",
      data: [0, 0, 0, 0, 0],
    },
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    userStr && setLogedInUser(JSON.parse(userStr));
  }, []);

  const getUserTransactions = async () => {
    const { status, message, data } = await getTransactions();
    status === "error" ? toast.error(message) : setTransactions(data);
    setChartData(calcChartData);
  };

  const calcChartData = () => {
    return transactions.length > 0
      ? {
          labels: ["Incomes", "Expenses"],
          datasets: [
            {
              label: "Income",
              data: transactions.reduce((acc, item) => {
                return item.type === "Income" ? acc + item.amount : acc;
              }, 0),
            },
            {
              label: "Expense",
              data: transactions.reduce((acc, item) => {
                return item.type === "Expense" ? acc + item.amount : acc;
              }, 0),
            },
          ],
        }
      : {
          labels: ["Incomes", "Expenses"],
          datasets: {
            label: "N/A",
            data: [0, 0, 0, 0, 0],
          },
        };
  };

  return (
    <UserContext.Provider
      value={{
        logedInUser,
        setLogedInUser,
        transactions,
        setTransactions,
        getUserTransactions,
        show,
        setShow,
        chartData,
        setChartData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
