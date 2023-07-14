export const mergeObjects = <T extends object>(obj1: T, obj2: T): T => {
  const result = {} as T;
  for (const key in obj1) {
    result[key] = obj2[key] ?? obj1[key];
  }
  return result;
};
