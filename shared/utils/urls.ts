export const appendQueryParamsToUrl = (
  urlPath: string,
  params?: Record<
    string,
    string | string[] | number | number[] | boolean | null | undefined
  > | void,
) => {
  if (!params) return urlPath;

  const urlParams = new URLSearchParams();

  const hasExistingQueryParams = urlPath.includes("?");
  const urlPathWithoutQueryParamsAndTrailingSlash = urlPath.split("?")[0]?.replace(/[?/]+$/, "");

  if (hasExistingQueryParams) {
    const [, existingQueryParams] = urlPath.split("?");
    const existingParams = new URLSearchParams(existingQueryParams);

    existingParams.forEach((value, key) => {
      urlParams.append(encodeURIComponent(key), encodeURIComponent(value));
    });
  }

  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;

    urlParams.append(encodeURIComponent(key), encodeURIComponent(value.toString()));
  });

  return `${urlPathWithoutQueryParamsAndTrailingSlash?.concat("/")}?${urlParams.toString()}`;
};
