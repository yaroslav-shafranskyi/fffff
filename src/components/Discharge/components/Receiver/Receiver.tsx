import { ChangeEvent, FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import { IDischarge } from "../../../../api";
import { IFCPropsWithReadonly } from "../../../../interfaces";
import { Input } from "../../../../shared";
import { inputHintStyles, inputTitleStyles } from "../../styles";

import { receiverInputPropsSx, receiverInputStyles } from "./styles";

export const Receiver: FC<IFCPropsWithReadonly> = ({ readonly }) => {
  const { formState, setValue, getValues, register, clearErrors } =
    useFormContext<IDischarge>();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!readonly) {
        setValue("receiver", event.target.value);
        clearErrors("receiver");
      }
    },
    [readonly, setValue, clearErrors]
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="caption" sx={inputHintStyles}>
        (найменування і місцезнаходження закладу охорони здоров’я, куди
        направляється виписка)
      </Typography>
      <Box sx={inputTitleStyles}>
        <Typography>У</Typography>
      </Box>
      <Input
        sx={receiverInputStyles}
        multiline={true}
        rows={4}
        {...register("receiver")}
        onChange={handleInputChange}
        value={getValues("receiver") ?? ""}
        inputProps={{ sx: receiverInputPropsSx }}
        error={formState.errors?.receiver?.message}
      />
    </Box>
  );
};
