import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Landing,
  Error,
  Login,
  Dashboard,
  View,
  Map,
  Profile,
  Favorites,
  About,
  ProtectedRoute,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Map />} />
          <Route path="view/:id" element={<View />} />
          <Route path="about" element={<About />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
