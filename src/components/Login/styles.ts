import { SxProps } from "@mui/material";

export const wrapperStyles: SxProps = {
  display: "grid",
  maxWidth: "400px",
  margin: "auto",
  position: "absolute",
  left: 0,
  right: 0,
  top: "50%",
  transform: "translate(0, -50%)",
  bgcolor: "background.paper",
  padding: 4,
  gap: 4,
};

export const actionsStyles: SxProps = {
  display: "flex",
  gap: 2,
};

export const inputsWrapperStyles: SxProps = {
  display: "grid",
  gap: 2,
};
