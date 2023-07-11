import { useRef } from "react";
import SignaturePad from "react-signature-canvas";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import { clearButtonStyles } from "../../constants";

import { SignatureDialogType } from "./types";

const SIGNATURE_SIZE = 320;

export const SignatureDialog: SignatureDialogType = ({ onSubmit, onClose }) => {
  const sigPad = useRef<SignaturePad>(null);

  const handleClear = () => {
    sigPad.current?.clear();
  };

  const handleSubmit = () => {
    const dataURL = sigPad.current?.getTrimmedCanvas().toDataURL();
    if (!dataURL) {
      return;
    }
    onSubmit(dataURL);
    onClose();
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth={true}>
      <DialogContent>
        <Typography>Намалюйте свій підпис</Typography>
        <Box sx={{ width: SIGNATURE_SIZE, height: SIGNATURE_SIZE }}>
          <SignaturePad
            ref={sigPad}
            canvasProps={{
              width: SIGNATURE_SIZE,
              height: SIGNATURE_SIZE,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={clearButtonStyles} onClick={handleClear}>
          Очистити
        </Button>
        <Button onClick={handleSubmit}>Прийняти</Button>
      </DialogActions>
    </Dialog>
  );
};
