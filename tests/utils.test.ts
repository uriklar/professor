import { generateID } from "../utils";

describe("utils", () => {
  describe("Board id generation", () => {
    it("should generate a consecutive ID", () => {
      expect(
        generateID("uri", ["uri-4342", "uri-5678", "not-uri-3435"])
      ).toEqual("uri-1");
    });
  });
});
