import React from "react";
import { shallow, mount, render } from "enzyme";
import Product from "../../Product";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

function mountProduct(props = {}) {
  const propsToUse = {
    context: {
      user: {
        id: ""
      }
    },
    ...props
  };
  return mount(<Product {...propsToUse} />);
}

export { mountProduct };
