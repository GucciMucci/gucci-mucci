const addToBag = require("./Card");

describe("addToBag()", () => {
  test("adds to local storage", () => {
    expect(addToBag({ name: "bob" })).includes("bagArray");
  });
});
