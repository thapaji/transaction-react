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
    datasets: [
      {
        label: "N/A",
        data: [0, 0, 0, 0, 0],
      },
      { label: "N/A", data: [1, 2, 3, 4, 5] },
    ],
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    userStr && setLogedInUser(JSON.parse(userStr));
  }, []);

  const getUserTransactions = async () => {
    const { status, message, data } = await getTransactions();
    status === "error" ? toast.error(message) : setTransactions(data);
    // setChartData(calcChartData());
  };

  const calcChartData = () => {
    const income = transactions.reduce((acc, item) => {
      return item.type === "Income" ? acc + item.amount : acc;
    }, 0);
    const expense = transactions.reduce((acc, item) => {
      return item.type === "Income" ? acc + item.amount : acc;
    }, 0);
    return transactions.length > 0
      ? {
          labels: ["Incomes", "Expenses"],
          datasets: [
            {
              label: "2024",
              backgroundColor: ["rgba(0, 150, 0, 1)", "rgba(255, 99, 132, 0.5)"],
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
              data: [
                transactions.reduce((acc, item) => {
                  return item.type === "Income" ? acc + item.amount : acc;
                }, 0),
                transactions.reduce((acc, item) => {
                  return item.type === "Expenses" ? acc + item.amount : acc;
                }, 0),
              ],
            },
          ],
        }
      : {
          labels: ["Incomes", "Expenses"],
          datasets: [
            {
              label: "N/A",
              data: [1, 2, 3, 4, 5],
            },
          ],
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
        calcChartData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
