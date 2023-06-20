import { useState, MouseEvent } from 'react';
import { Container, Box, Typography, Link, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircleOutlined as AvatarIcon, ArrowRight as OpenMenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { personsUrl } from '../../constants';

import { useOpenFormDialog } from '../OpenForm';
import { OpenForm100Dialog } from '../Form100';
import { OpenPersonDialog } from '../Person';

import { containerStyles, linkStyles, linksWrapperStyles, menuIconStyles } from './styles';

const additionalOptions = ['Консультативний висновок', 'Виписка', 'Направлення'];

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const [OpenForm100Component, handleOpenForm100] = useOpenFormDialog(OpenForm100Dialog);
    const [OpenPersonComponent, handleOpenPerson] = useOpenFormDialog(OpenPersonDialog)

    const isMenuOpen = Boolean(anchorEl);

    const goToPersonsTable = () => {
        navigate(personsUrl);
    };

    const handleOpenMenu = (event: MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Container disableGutters={true} sx={containerStyles} maxWidth={false}>
            <Box>
                <Typography variant='h4'>Logo</Typography>
            </Box>
            <Box sx={linksWrapperStyles}>
                <Link
                    component='button'
                    color='textPrimary'
                    sx={linkStyles}
                    onClick={handleOpenForm100}
                >
                    Форма 100
                </Link>
                <Link
                    component='button'
                    color='textPrimary'
                    sx={linkStyles}
                    onClick={handleOpenPerson}
                >
                    Швидкий Пошук
                </Link>
                <Link
                    component='button'
                    color='textPrimary'
                    sx={linkStyles}
                    onClick={goToPersonsTable}
                >
                    Перелік Поранених
                </Link>
                <Link
                    color='textPrimary'
                    component='button'
                    sx={linkStyles}
                    onClick={handleOpenMenu}
                >
                    Додаткові документи
                    <IconButton sx={menuIconStyles}>
                        <OpenMenuIcon sx={ isMenuOpen ? { transform: 'rotate(90deg)' } : {}} />
                    </IconButton>
                </Link>
            </Box>
            <IconButton sx={{ justifySelf: 'end' }}>
                <AvatarIcon />
            </IconButton>
            <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={handleCloseMenu}>
                {additionalOptions.map(op => (
                    <MenuItem key={op} value={op}>{op}</MenuItem>
                ))}
            </Menu>
            {OpenForm100Component}
            {OpenPersonComponent}
        </Container>
    )
};
