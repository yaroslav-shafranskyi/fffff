import { FC, SyntheticEvent, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

import { dialogActionsStyles, dialogContentStyles, dialogButtonStyles } from './styles';

const options = ['Вася', 'Петя', 'Коля']

export const OpenForm100Dialog: FC<{onClose : () => void;}> = ({ onClose }) => {
    const [personName, setPersonName] = useState<string>('');

    const navigate = useNavigate();

    const goToForm100 = () => {
        navigate('/form100');
    };

    const handleChange = (_event: SyntheticEvent<Element, Event>, value: string | null) => {
        setPersonName(value ?? '');
    };

    return (
        <Dialog
        open={true}
        fullWidth={true}
        maxWidth='lg'
        onClose={onClose}
        >
            <DialogContent sx={dialogContentStyles}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    Ви бажаєте створити нову Форму 100 чи переглянути існуючу?
                </Typography>
                <Box>
                    <Autocomplete
                        value={personName}
                        renderInput={params => <TextField {...params} placeholder='Почніть вводити прізвище' />}
                        options={options}
                        noOptionsText='Збігів не знайдено'
                        onChange={handleChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={dialogActionsStyles}>
                <Button
                    variant='contained'
                    sx={dialogButtonStyles}
                    size='large'
                    onClick={goToForm100}
                >
                    Створити
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={dialogButtonStyles}
                    size='large'
                    onClick={goToForm100}
                >
                    Переглянути
                </Button>
            </DialogActions>
        </Dialog>
    );
};
