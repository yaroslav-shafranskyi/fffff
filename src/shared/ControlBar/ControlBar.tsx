import { FC } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { IControlBarProps } from './types';
import { actionsWrapperStyles, containerStyles } from './styles';

export const ControlBar: FC<IControlBarProps> = (props) => {
    const { submitButtonText = 'Зберегти', onSubmit, onClear, onBack } = props;

    const navigate = useNavigate();

    const handleClear = () => {
        onClear?.()
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
            <IconButton onClick={handleGoBack}>
                <BackIcon />
            </IconButton>
            <Box sx={actionsWrapperStyles}>
                <Button sx={{ bgcolor: 'primary.light' }} variant='contained' onClick={handleClear}>
                    Очистити
                </Button>
                <Button variant='contained' onClick={handleSubmit}>
                    {submitButtonText}
                </Button>
            </Box>
        </Box>
    );
};
