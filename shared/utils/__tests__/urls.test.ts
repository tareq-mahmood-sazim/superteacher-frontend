import { appendQueryParamsToUrl } from "../urls";

describe("urls", () => {
  describe("appendQueryParamsToUrl", () => {
    it("should return the original URL if no params are provided", () => {
      const urlPath = "/test";
      expect(appendQueryParamsToUrl(urlPath)).toBe("/test");
    });

    it("should append query params to the URL", () => {
      const urlPath = "/test";
      const params = {
        param1: "value1",
        param2: "value2",
      };
      const expectedUrl = "/test/?param1=value1&param2=value2";
      expect(appendQueryParamsToUrl(urlPath, params)).toBe(expectedUrl);
    });

    it("should handle URL with existing query params", () => {
      const urlPath = "/test?existingParam=existingValue";
      const params = {
        param1: "value1",
        param2: "value2",
      };
      const expectedUrl = "/test/?existingParam=existingValue&param1=value1&param2=value2";
      expect(appendQueryParamsToUrl(urlPath, params)).toBe(expectedUrl);
    });

    it("should handle URL with trailing slash", () => {
      const urlPath = "/test2/";
      const params = {
        param1: "value1",
        param2: "value2",
      };
      const expectedUrl = "/test2/?param1=value1&param2=value2";
      expect(appendQueryParamsToUrl(urlPath, params)).toBe(expectedUrl);
    });

    it("should handle URL with special characters", () => {
      const urlPath = "/test";
      const params = {
        param1: "value 1",
        param2: "value&2",
      };
      const expectedUrl = "/test/?param1=value%25201&param2=value%25262";
      expect(appendQueryParamsToUrl(urlPath, params)).toBe(expectedUrl);
    });

    it("should handle URL with null or undefined values", () => {
      const urlPath = "/test";
      const params = {
        param1: null,
        param2: undefined,
        param3: "value3",
      };
      const expectedUrl = "/test/?param3=value3";
      expect(appendQueryParamsToUrl(urlPath, params)).toBe(expectedUrl);
    });

    it("should handle arrays as values", () => {
      const urlPath = "/test";
      const params = {
        param1: ["value1", "value2"],
        param2: ["value3"],
      };
      const expectedUrl = "/test/?param1=value1%252Cvalue2&param2=value3";
      expect(appendQueryParamsToUrl(urlPath, params)).toBe(expectedUrl);
    });
  });
});
