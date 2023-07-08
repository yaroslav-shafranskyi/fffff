import { FC } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { IControlBarProps } from "./types";
import { actionsWrapperStyles, containerStyles, titleStyles } from "./styles";
import { clearButtonStyles } from "../../constants";

export const ControlBar: FC<IControlBarProps> = (props) => {
  const {
    title,
    submitButtonText = "Зберегти",
    onSubmit,
    onClear,
    onBack,
  } = props;

  const navigate = useNavigate();

  const handleClear = () => {
    onClear?.();
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  const handleSubmit = () => {
    onSubmit?.();
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={titleStyles}>
        <IconButton onClick={handleGoBack}>
          <BackIcon />
        </IconButton>
        {title !== undefined && <Typography variant="h4">{title}</Typography>}
      </Box>
      <Box sx={actionsWrapperStyles}>
        <Button
          sx={clearButtonStyles}
          variant="contained"
          onClick={handleClear}
        >
          Очистити
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
};
