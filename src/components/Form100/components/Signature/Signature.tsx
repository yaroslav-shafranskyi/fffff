import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import { Signature as SharedSignature } from "../../../../shared";
import { IForm100 } from "../../../../api";

export const Signature = () => {
  const { getValues, setValue } = useFormContext<IForm100>();

  const signature = getValues("signature");

  const handleChange = (sig?: string) => {
    setValue("signature", sig);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <SharedSignature onSubmit={handleChange} signature={signature} />
      <Typography variant="caption">підпис (розбірливо)</Typography>
    </Box>
  );
};
