import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { mountProduct } from "./helpers/helpers";

describe("Product Component", () => {
  test("Product Component Renders correctly", () => {
    const wrapper = mountProduct();
    wrapper.debug();
    expect(wrapper).toMatchSnapshot();
  });
});
