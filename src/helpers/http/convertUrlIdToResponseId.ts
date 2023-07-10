export const convertUrlIdToResponseId = (urlId: string) =>
  !urlId || urlId === "create" ? "-1" : urlId;
