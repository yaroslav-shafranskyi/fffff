import { SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Theme } from "@mui/system";

export const containerStyles: SxProps<Theme> = (theme) => ({
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "1fr 5fr 1fr",
  p: 2,
  height: theme.spacing(10),
  background: theme.palette.background.paper,
  borderBottom: `2px solid ${grey[500]}`,
});

export const linksWrapperStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  gap: 4,
};

export const linkStyles: SxProps = {
  textTransform: "none",
  cursor: "pointer",
  textDecoration: "none",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: "primary.text",
    fontWeight: "bolder",
    textDecoration: "underline",
  },
};

export const getMenuIconStyles = (isMenuOpen?: boolean): SxProps => ({
  ml: -0.5,
  mt: 0.5,
  transform: isMenuOpen ? "rotate(90deg)" : "none",
});

export const profileStyles: SxProps = {
  display: "flex",
  alignSelf: "end",
  justifyContent: "end",
};
