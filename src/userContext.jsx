import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTransactions } from "./helpers/axiosHelper";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [logedInUser, setLogedInUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    userStr && setLogedInUser(JSON.parse(userStr));
  }, []);

  const getUserTransactions = async () => {
    const { status, message, data } = await getTransactions();
    status === "error" ? toast.error(message) : setTransactions(data);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
