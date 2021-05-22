import React, { ReactNode } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import useFetch from "../helpers/useFetch";

interface IProps {
  component: ReactNode;
}
//@ts-expect-error
const PrivateRoute3 = ({ component: Component, ...rest }) => {
  const allUsers = useFetch("allusers");
  const allAdmins = useFetch("alladmins");
  const allAgents = useFetch("allagents");

  return (
    <Route
      {...rest}
      render={(props) =>
        document.cookie ? (
          <Component
            allUsers={allUsers}
            allAdmins={allAdmins}
            allAgents={allAgents}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute3;
