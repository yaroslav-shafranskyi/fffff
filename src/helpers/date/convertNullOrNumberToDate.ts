export const convertNullOrNumberToDate = (
  n?: number | null
): Date | undefined => (!n ? undefined : new Date(+n));
