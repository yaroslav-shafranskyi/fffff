import { Card } from '@mui/material';

import { Header } from '../Header';

import { containerStyles } from './styles';
import { Title } from './Title';
import { Main } from './Main';

export const Home = () => {
    return (
        <>
            <Header />
            <Card sx={containerStyles}>
                <Title />
                <Main />
            </Card>
        </>
    );
};
