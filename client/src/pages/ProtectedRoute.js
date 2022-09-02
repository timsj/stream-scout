import React from "react";
import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  //re-directs users that are not signed in from protected rouute to landing page
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
