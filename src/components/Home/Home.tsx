import { Box, Card } from '@mui/material';

import { containerStyles, contentStyles } from './styles';
import { Title } from './Title';
import { Main } from './Main';

export const Home = () => {
    return (
        <Box sx={containerStyles}>
            <Card sx={contentStyles}>
                <Title />
                <Main />
            </Card>
        </Box>
    );
};
