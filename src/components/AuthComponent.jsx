import React from "react";
import { Navigate } from "react-router-dom";

export const AuthComponent = ({ children, logedInUser }) => {
  return logedInUser?._id ? children : <Navigate to="/" />;
};
