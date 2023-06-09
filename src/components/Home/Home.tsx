import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('form100')
    }
    return <Box>
        <Typography variant='h3'>Home</Typography>
        <Button onClick={handleClick}>Button</Button>
    </Box>
}