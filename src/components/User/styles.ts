import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const updateUserButtonStyles: SxProps = {
  bgcolor: "primary.light",
  color: "text.primary",
  "&:hover": {
    bgcolor: "primary.main",
  },
};

export const menuButtonsWrapperStyles: SxProps = {
  display: "grid",
  gap: 1,
  pt: 2,
};

export const menuPaperStyles: SxProps = {
  p: 2,
};

export const menuStyles: SxProps = {
  display: "flex",
  gap: 1,
  flexDirection: "column",
  alignItems: "center",
};

export const menuItemStyles: SxProps = {
  width: "100%",
  display: "flex",
  gap: 1,
  ml: -2,
};

export const dialogActionsStyles: SxProps = {
  display: "flex",
  justifyContent: "space-around",
  px: 5,
  mb: 5,
  gap: 2,
};

export const dialogContentStyles: SxProps = {
  gap: 6,
  display: "grid",
  p: 5,
};

export const dialogButtonStyles: SxProps<Theme> = (theme) => ({
  width: "100%",
  height: theme.spacing(7),
});

export const openButtonStyles: SxProps<Theme> = (theme) => ({
  ...dialogButtonStyles(theme),
  bgcolor: "primary.light",
  color: "text.primary",
  "&:hover": {
    bgcolor: theme.palette.primary.main,
  },
});

export const dialogInputsWrapperStyles: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 2,
};

export const cardStyles: SxProps = {
  p: 2,
  display: "grid",
  gap: 2,
};

const commonWrapperStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const containerStyles: SxProps = {
  py: 2,
  bgcolor: "background.paper",
  ...commonWrapperStyles,
};

export const infoWrapperStyles: SxProps = {
  ...commonWrapperStyles,
};

export const infoRowStyles: SxProps = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 2,
};
