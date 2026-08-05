const { maskPassword } = require("../controllers/passwordController");

describe("maskPassword", () => {
  test("should mask the middle of a normal password", () => {
    const result = maskPassword("sunshine123");
    expect(result).toBe("s*********3");
  });
});
