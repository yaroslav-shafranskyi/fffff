import { FC, forwardRef, useMemo } from "react";
import { Box, TextField, Typography } from "@mui/material";

import { IInputProps } from "./types";

export const Input: FC<IInputProps> = forwardRef((props, ref) => {
  const { error, inputProps, variant = "standard" } = props;

  const defaultSx = useMemo(
    () => (variant === "standard" ? { p: 0 } : {}),
    [variant]
  );
  return (
    <Box>
      <TextField
        ref={ref}
        sx={defaultSx}
        variant={variant}
        {...props}
        error={error !== undefined}
        inputProps={{ sx: defaultSx, ...inputProps }}
      />
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
});
