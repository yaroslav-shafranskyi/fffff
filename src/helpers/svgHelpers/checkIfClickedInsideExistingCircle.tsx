export const checkIfClickedInsideExistingCircle = (newCoord: number, oldCoord: number, radius: number) => {
  const diff = newCoord - oldCoord;
  return (diff >= 0 && diff < radius) || (diff <= 0 && diff > -radius);
};
