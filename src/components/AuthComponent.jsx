import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../userContext";

export const AuthComponent = ({ children }) => {
  const { setLogedInUser, logedInUser } = useUser();
  return logedInUser?._id ? children : <Navigate to="/" />;
};
