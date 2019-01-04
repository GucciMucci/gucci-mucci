// import { configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// configure({ Adapter: new Adapter() });

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
