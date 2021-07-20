import { Ok, Err } from "@/result";

describe("Test result monad", () => {
  it("should return wrapped value within Ok", async () => {
    const value = Ok(5);
    expect(value.isOk()).toBe(true);
  });
  it("should return unwrapped value from Ok", async () => {
    const val = 15;
    const som = Ok(val);
    expect(som.unwrap()).toBe(val);
  });
  it("should be true if Err is err monad", async () => {
    expect(Err().isErr()).toBe(true);
  });
  it("should return Ok from match", async () => {
    const val = Ok(20);
    const req = val.match({
      Ok: (v: number) => 20 * v,
      Err: () => null,
    });
    expect(req).toBe(val.unwrap() * 20);
  });
  it("should return Err from match", async () => {
    const req = Err("ERROR").match({
      Ok: (v: number) => 20 * v,
      Err: (err: any) => err,
    });
    expect(req).toBe("ERROR");
  });
  it("should convert Ok to Option", async () => {
    const val = Ok(50);
    expect(val.unwrap()).toBe(50);
    const some = val.ok();
    expect(some.isSome()).toBeTruthy();
  });
  it("should convert Err to Option", async () => {
    const val = Err("ERROR");
    expect(val.unwrap()).toBe("ERROR");
    const some = val.err();
    expect(some.isSome()).toBeTruthy();
  });
  it("should convert Ok/Err to Some(err/ok)", async () => {
    expect(Ok(5).err().isNone()).toBeTruthy();

    expect(Err(5).ok().isNone()).toBeTruthy();
  });
});
