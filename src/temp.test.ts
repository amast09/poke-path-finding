import nock from "nock";

describe("tempTest", () => {
  it("should pass", () => {
    expect(nock).not.toEqual(null);
  });
});
