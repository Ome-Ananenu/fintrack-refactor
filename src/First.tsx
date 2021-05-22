import React from "react";
import Dashboard from "./components/DashBoard";

//@ts-expect-error
const First = ({ requests }) => {
  return (
    <div className="containers">
      <Dashboard requests={requests} />
    </div>
  );
};

export default First;
