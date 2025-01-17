import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <Dashboard />
      <ToastContainer />
    </div>
  );
};

export default App;
