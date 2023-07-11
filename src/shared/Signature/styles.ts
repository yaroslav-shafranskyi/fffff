import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const getSignatureWrapper =
  (variant: "outlined" | "text"): SxProps<Theme> =>
  (theme) => {
    const variantStyles =
      variant === "outlined"
        ? {
            border: "1px solid",
            maxHeight: theme.spacing(7),
            borderRadius: theme.shape.borderRadius / 4,
            borderColor: theme.palette.grey[400],
            alignItems: "center",
            p: 2,
          }
        : {};

    return {
      display: "flex",
      gap: 0.5,
      cursor: "pointer",
      height: "100%",
      ...variantStyles,
    };
  };
