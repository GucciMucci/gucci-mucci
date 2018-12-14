import React from "react";
import { shallow, mount, render } from "enzyme";
import { Product } from "../Product.js";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { mountProduct } from "./helpers/helpers";

describe("Product Component", () => {
  test("Product Component Renders correctly", () => {
    const wrapper = mount(<Product context={{ user: { id: "" } }} />);
    // wrapper.debug();
    wrapper.setState({
      product: {
        images: [{ image: "http://http.cat/404" }, { image: "http://http.cat/418" }],
        details: ["testing"]
      }
    });
    expect(wrapper.state().product).toBe("http://http.cat/404");
  });
});
