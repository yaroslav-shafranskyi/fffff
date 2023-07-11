export const convertBinaryToDataURL = (
  binaryData: string,
  mimeType = "image/png"
) => {
  const base64Data = btoa(binaryData);
  const dataURL = `data:${mimeType};base64,${base64Data}`;
  return dataURL;
  // const blob = new Blob([binaryData], { type: mimeType });
  // const objectURL = URL.createObjectURL(blob);

  // const image = new Image();
  // image.src = objectURL;

  // return new Promise((resolve, reject) => {
  //   image.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     const context = canvas.getContext("2d");

  //     canvas.width = image.width;
  //     canvas.height = image.height;

  //     context?.drawImage(image, 0, 0);

  //     const dataURL = canvas.toDataURL(mimeType);
  //     resolve(dataURL);
  //   };

  //   image.onerror = () => {
  //     reject(new Error("Failed to convert binary data to data URL."));
  //   };
  // });
};
