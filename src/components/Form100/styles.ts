import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const containerStyles: SxProps = {
  p: 2,
  height: "100%",
  borderRadius: 0,
  display: "grid",
  gridTemplateRows: "inherit",
};

export const boldTextStyles: SxProps = {
  fontWeight: "bold",
};

export const SECTION_MIN_WIDTH = 350;

export const sectionStyles: SxProps = {
  minWidth: SECTION_MIN_WIDTH,
};

export const iconStyles: SxProps<Theme> = (theme) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  p: 0,
  margin: "auto",
  "& svg:first-of-type": {
    ":focus": {
      outline: "none",
      border: "none",
    },
  },
});

export const cursorPointerStyles: SxProps = {
  cursor: "pointer",
};

export const displayFlexStyles: SxProps = {
  display: "flex",
};

export const dateNumberInputStyles: SxProps = {
  p: 0,
  width: "min-content",
  minWidth: 12,
};

export const severalInlineOptionsWrapperStyles: SxProps = {
  display: "flex",
  gridColumnGap: 2,
};

export const commonWrapperStyles: SxProps = {
  border: "4px solid",
  borderColor: "text.primary",
  display: "grid",
  width: "100%",
};
