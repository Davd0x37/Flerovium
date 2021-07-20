import { None, Some } from "@/option";

describe("Test option monad", () => {
  it("should return wrapped value within Some", async () => {
    const value = Some(5);
    expect(value.isSome()).toBe(true);
  });
  it("should return unwrapped value from Some", async () => {
    const val = 15;
    const som = Some(val);
    expect(som.unwrap()).toBe(val);
  });
  it("should return None enum from None monad", async () => {
    expect(None().isNone()).toBe(true);
  });
  it("should return some from match", async () => {
    const val = Some(20);
    const req = val.match({
      some: (v) => 20 * v,
      none: "TEST",
    });
    expect(req).toBe(val.unwrap() * 20);
  });
  it("should return none from match", async () => {
    const req = None().match({
      some: (v) => 20 * v,
      none: "TEST",
    });
    expect(req).toBe("TEST");
  });
});
