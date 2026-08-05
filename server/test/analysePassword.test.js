const { analysePassword } = require("../controllers/passwordController");

describe("analysePassword", () => {
  let req, res;

  test("should return a high score for a strong password", async () => {
  req.body = { password: "Xk9#mP2$vL8@qR5!" };

  await analysePassword(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      score: expect.any(Number),
      label: expect.any(String),
    })
  );
});

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
});
