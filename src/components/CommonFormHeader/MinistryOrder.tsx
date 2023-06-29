import { Box, Typography } from '@mui/material';

import { boldTextStyles, headerStyles } from './styles';

export const MinistryOrder = () => {
    return (
        <>
            <Box sx={headerStyles}>
                <Typography sx={boldTextStyles}>
                    ЗАТВЕРДЖЕНО
                </Typography>
                <Typography variant='caption'>
                    Наказ Міністерства охорони здоров’я України
                </Typography>
                <Typography variant='caption'>
                    14 лютого 2012 року № 110
                </Typography>
            </Box>
        </>
    );
};
