import { FC, SyntheticEvent, useMemo, useState } from 'react';
import { 
    Button,
    DialogActions,
    DialogContent,
    Typography,
    Autocomplete,
    TextField,
    Dialog,
    Box
} from '@mui/material';

import { useQueryPersons } from '../../api';
import { getInitialQuery } from '../../constants';

import { dialogActionsStyles, dialogContentStyles, dialogButtonStyles } from './styles';
import { IOpenFormDialog } from './types';

export const OpenFormDialog: FC<IOpenFormDialog> = (props) => {
    const { title, onClose, goToCreateMode, goToUpdateMode } = props;

    const [personName, setPersonName] = useState<string>('');
    const [personId, setPersonId] = useState<string>();
    const [value, setValue] = useState<string | null>(null);

    const { data: persons } = useQueryPersons({ ...getInitialQuery(), filterBy: { fullName: personName }});

    const convertedPersons = useMemo(
        () => persons.reduce((acc: Record<string, string>, {fullName, id, rank, militaryBase}) => {
            acc[id] = `${fullName}, ID: ${id}, ${rank}, в/ч(з’єднання): ${militaryBase}`;
            return acc;
            }, {}), [persons]);

    const handleChange = (_event: SyntheticEvent<Element, Event>, value: string | null) => {
        setValue(value);
        if (!value) {
            return;
        }
        const selectedPersonId = Object.keys(convertedPersons).find(id => convertedPersons[id] === value);
        if (selectedPersonId) {
            setPersonId(selectedPersonId);
        }
    };

    const handleInputChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        setPersonName(value);
    }

    return (
        <Dialog
        open={true}
        fullWidth={true}
        maxWidth='lg'
        onClose={onClose}
        >
            <DialogContent sx={dialogContentStyles}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    {title}
                </Typography>
                <Box>
                    <Autocomplete
                        value={value}
                        renderInput={params => <TextField {...params} placeholder='Почніть вводити прізвище' />}
                        options={Object.values(convertedPersons)}
                        noOptionsText='Збігів не знайдено'
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={dialogActionsStyles}>
                <Button
                    variant='contained'
                    sx={dialogButtonStyles}
                    size='large'
                    onClick={goToCreateMode}
                >
                    Створити
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={dialogButtonStyles}
                    size='large'
                    onClick={goToUpdateMode(personId)}
                >
                    Переглянути
                </Button>
            </DialogActions>
        </Dialog>
    );
};
