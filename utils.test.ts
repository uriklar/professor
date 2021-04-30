import {getNextFreeId} from "./utils"

describe("getNextFreeId", () => {
  it("should find next id correctly", () => {
    expect(getNextFreeId("test", ["test-1", "test-3"])).toEqual("2");

    expect(getNextFreeId("test-uri", ["test-uri-1", "test-2", "test-3", "test-uri-2", "test-uri-3"])).toEqual("4");

  });
});
