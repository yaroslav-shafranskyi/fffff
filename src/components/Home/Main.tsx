import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { 
    buttonDescStyles,
    lightButtonStyles,
    mainButtonStyles,
    mainLowerButtonsStyles,
    mainUpperButtonsStyles,
    mainWrapperStyles,
    searchButtonStyles
} from './styles';

export const Main = () => {
    const navigate = useNavigate()

    const goToForm100 = () => {
        navigate('/form100')
    }

    return (
        <Box sx={mainWrapperStyles}>
            <Box sx={mainUpperButtonsStyles}>
                <Button variant='contained' sx={mainButtonStyles} onClick={goToForm100}>
                    <Typography variant='h4'>
                        Форма 100
                    </Typography>
                    <Typography sx={buttonDescStyles}>
                        Створіть або перегляньте форму для поранених чи хворих військовослужбовців.
                    </Typography>
                </Button>
                <Box sx={searchButtonStyles}>
                    <Button  variant='contained' color='secondary' sx={mainButtonStyles}>
                        <Typography variant='h5'>
                            Швидкий Пошук
                        </Typography>
                        <Typography sx={buttonDescStyles}>
                            Знайдіть інформацію про хворого чи пораненого швидко та ефективно.
                        </Typography>
                    </Button>
                    <Button  variant='contained' color='secondary' sx={mainButtonStyles}>
                        <Typography variant='h5'>
                            Перелік Поранених
                        </Typography>
                        <Typography sx={buttonDescStyles}>
                            Перегляньте всю базу даних поранених.
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Box sx={mainLowerButtonsStyles}>
                <Button variant='contained' sx={lightButtonStyles}>
                    <Typography>
                        Консультативний висновок
                    </Typography>
                </Button>
                <Button variant='contained' sx={lightButtonStyles}>
                    <Typography>
                        Виписка
                    </Typography>
                </Button>
                <Button variant='contained' sx={lightButtonStyles}>
                    <Typography>
                        Направлення
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};
