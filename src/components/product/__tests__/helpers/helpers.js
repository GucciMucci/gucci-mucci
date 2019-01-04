import React from "react";
import { shallow, mount, render } from "enzyme";
import Product from "../../Product";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

class mountProduct extends React.Component {
  constructor(props = {}) {
    super(props);
    this.state = {};
  }
  render() {
    const propsToUse = {
      context: {
        user: {
          id: ""
        }
      },
      ...props
    };
    return shallow(<Product {...propsToUse} />);
  }
}

export { mountProduct };
