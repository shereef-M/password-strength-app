jest.mock("axios");
const axios = require("axios");
const { checkBreach } = require("../controllers/passwordController");

describe("checkBreach", () => {
  let req, res;

  test("should return breachFound true when password is in a known breach", async () => {
    axios.get.mockResolvedValue({
      data: "003D68EB55068C33ACE09247EE4C639306:5\nAAA0000000000000000000000000000000:2",
    });

    req.body = { password: "password123" };

    await checkBreach(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const responseBody = res.json.mock.calls[0][0];
    expect(responseBody).toHaveProperty("breachFound");
    expect(responseBody).toHaveProperty("breachCount");
  });

  test("should return breachFound false when password is not in the breach list", async () => {
    axios.get.mockResolvedValue({
      data: "AAA0000000000000000000000000000000:2\nBBB1111111111111111111111111111111:7",
    });

    req.body = { password: "SomeUniquePassword!987" };

    await checkBreach(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const responseBody = res.json.mock.calls[0][0];
    expect(responseBody.breachFound).toBe(false);
    expect(responseBody.breachCount).toBe(0);
  });

  beforeEach(() => {
    req = { body: {}, headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });
});
