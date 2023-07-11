export const convertDataURLToBinary = (dataURL: string) => {
  const base64Data = dataURL.split(",")[1];
  const binaryData = atob(encodeURI(base64Data));
  return binaryData;
};
