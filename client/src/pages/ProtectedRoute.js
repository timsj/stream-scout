import React from "react";
import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";
import { Loading } from "../components";

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  //while checking user auth on page refresh, shows Loading spinner
  if (userLoading) return <Loading center />;

  //re-directs users that are not signed in from protected route to landing page
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
