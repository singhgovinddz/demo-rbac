import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TodoContainer from "../components/Todos";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Fragment>
      {isAuthenticated ? <TodoContainer /> : 'Login required to view conent'}
      
    </Fragment>
  );
}

export default Home;
