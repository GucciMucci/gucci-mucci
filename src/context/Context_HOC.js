import React from "react";
import { AppContext } from "./ContextProvider";

export default function withContext(Component) {
  return function constextComponent(props) {
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
}
