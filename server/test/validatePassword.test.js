const validatePassword = require("../middleware/validatePassword");

describe("validatePassword middleware", () => {
  let req, res, next;

  test("Should reject when password is missing", () => {
    req.body = {};

    validatePassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Password is required" });
    expect(next).not.toHaveBeenCalled();
  });
  test("Should call next() when password is valid", () => {
    req.body = { password: "MySecurePass123!" };

    validatePassword(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
});
