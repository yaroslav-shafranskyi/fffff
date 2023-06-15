import { Card } from '@mui/material';

import { containerStyles } from './styles';
import { Header } from './Header';
import { Title } from './Title';
import { Main } from './Main';

export const Home = () => {
    return (
        <Card sx={containerStyles}>
            <Header />
            <Title />
            <Main />
        </Card>
    );
};
