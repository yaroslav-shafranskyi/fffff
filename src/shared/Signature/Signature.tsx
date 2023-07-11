import { FC } from "react";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";

import { useOpenFormDialog } from "../../components/OpenForm";

import { ISignatureProps } from "./types";
import { SignatureDialog } from "./SignatureDialog";
import { getSignatureWrapper } from "./styles";

export const Signature: FC<ISignatureProps> = ({
  signature,
  variant = "text",
  withHint,
  onSubmit,
}) => {
  const theme = useTheme();

  const [SignatureDialogComponent, openSigEditor] =
    useOpenFormDialog<ISignatureProps>(SignatureDialog);

  const handleOpenSigEditor = () => {
    openSigEditor({ onSubmit });
  };

  return (
    <>
      <Tooltip title=" Натисніть, щоб додати підпис">
        <Box sx={getSignatureWrapper(variant)} onClick={handleOpenSigEditor}>
          {withHint && <Typography>Підпис:</Typography>}
          {!!signature && (
            <img
              alt="Підпис"
              src={signature}
              style={{ maxHeight: theme.spacing(7) }}
            />
          )}
        </Box>
      </Tooltip>
      {SignatureDialogComponent}
    </>
  );
};
