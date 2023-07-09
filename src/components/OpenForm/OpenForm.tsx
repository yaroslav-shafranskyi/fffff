import { FC, SyntheticEvent, useCallback, useMemo, useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Autocomplete,
  TextField,
  Dialog,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGetPerson, useQueryPersons } from "../../api";
import { getInitialQuery } from "../../constants";

import {
  dialogActionsStyles,
  dialogContentStyles,
  dialogButtonStyles,
  openButtonStyles,
} from "./styles";
import { CallbackResponseType, IOpenFormDialog } from "./types";

export const OpenFormDialog: FC<IOpenFormDialog> = (props) => {
  const { title, onClose, goToCreateMode, goToUpdateMode } = props;

  const navigate = useNavigate();

  const [personName, setPersonName] = useState<string>("");
  const [personId, setPersonId] = useState<string>();
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string>();

  const { persons } = useQueryPersons({
    ...getInitialQuery(),
    filterBy: { fullName: personName },
  });

  const { person } = useGetPerson(personId);

  const convertedPersons = useMemo(
    () =>
      persons.reduce(
        (
          acc: Record<string, string>,
          { fullName, id, personalId, rank, militaryBase }
        ) => {
          acc[id] = fullName;
          if (personalId) {
            acc[id] += `, ID: ${personalId}`;
          }
          if (rank) {
            acc[id] += `, ${rank}`;
          }
          if (militaryBase) {
            acc[id] += `, в/ч(з’єднання): ${militaryBase}`;
          }
          return acc;
        },
        {}
      ),
    [persons]
  );

  const handleChange = useCallback(
    (_event: SyntheticEvent<Element, Event>, value: string | null) => {
      setError(undefined);
      setValue(value);
      if (!value) {
        return;
      }
      const { id } =
        persons.find(({ id }) => convertedPersons[id] === value) ?? {};
      if (id !== undefined) {
        setPersonId(String(id));
      }
    },
    [convertedPersons, persons]
  );

  const handleInputChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setPersonName(value);
    setError(undefined);
  };

  const handleCallback = useCallback(
    ({ error, url, state }: CallbackResponseType) => {
      if (error) {
        setError(error);
        return;
      }
      if (url) {
        navigate(url, { state });
      }
      onClose();
    },
    [navigate, onClose]
  );

  const handleGoToUpdateMode = useCallback(() => {
    handleCallback(goToUpdateMode(person));
  }, [goToUpdateMode, handleCallback, person]);

  const handleGoToCreateMode = useCallback(() => {
    handleCallback(goToCreateMode(person?.id));
  }, [goToCreateMode, handleCallback, person?.id]);

  return (
    <Dialog open={true} fullWidth={true} maxWidth="lg" onClose={onClose}>
      <DialogContent sx={dialogContentStyles}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {title}
        </Typography>
        <Box>
          <Autocomplete
            value={value}
            renderInput={(params) => (
              <TextField {...params} placeholder="Почніть вводити прізвище" />
            )}
            options={Object.values(convertedPersons)}
            noOptionsText="Збігів не знайдено"
            onChange={handleChange}
            onInputChange={handleInputChange}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={dialogActionsStyles}>
        <Button
          variant="contained"
          size="large"
          sx={openButtonStyles}
          onClick={handleGoToUpdateMode}
        >
          Переглянути
        </Button>
        <Button
          variant="contained"
          sx={dialogButtonStyles}
          size="large"
          onClick={handleGoToCreateMode}
        >
          Створити
        </Button>
      </DialogActions>
      {error && (
        <Box sx={{ p: 2 }}>
          <Typography color="error" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
        </Box>
      )}
    </Dialog>
  );
};
