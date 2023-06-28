import { useState, MouseEvent, useCallback } from 'react';
import { Container, Box, Typography, Link, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircleOutlined as AvatarIcon, ArrowRight as OpenMenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { personsUrl } from '../../constants';

import { useOpenFormDialog } from '../OpenForm';
import { OpenForm100Dialog } from '../Form100';
import { OpenPersonDialog } from '../PersonPage';
import { OpenDischargeForm } from '../Discharge';
import { OpenReferralForm } from '../Referral';

import { containerStyles, getMenuIconStyles, linkStyles, linksWrapperStyles } from './styles';

enum AdditionalOptions {
    CONCLUSION = 'Консультативний висновок',
    DISCHARGE = 'Виписка',
    REFERRAL = 'Направлення',
}

const additionalOptions = Object.values(AdditionalOptions);

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const [OpenForm100Component, handleOpenForm100] = useOpenFormDialog(OpenForm100Dialog);
    const [OpenPersonComponent, handleOpenPerson] = useOpenFormDialog(OpenPersonDialog);
    const [OpenDischargeComponent, handleOpenDischarge] = useOpenFormDialog(OpenDischargeForm);
    const [ReferralDialog, handleOpenReferral] = useOpenFormDialog(OpenReferralForm)

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

    const handleMenuOptionSelect = useCallback((option: AdditionalOptions) => () => {
        if (option === AdditionalOptions.DISCHARGE) {
            handleOpenDischarge();
        }
        if (option === AdditionalOptions.REFERRAL) {
            handleOpenReferral();
        }
        handleCloseMenu();
    }, [handleOpenDischarge, handleOpenReferral]);

    return (
        <Container disableGutters={true} sx={containerStyles} maxWidth={false}>
            <Box>
                <Typography variant='h5'>Logo</Typography>
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
                    <OpenMenuIcon sx={getMenuIconStyles(isMenuOpen)} />
                </Link>
            </Box>
            <IconButton sx={{ justifySelf: 'end' }}>
                <AvatarIcon />
            </IconButton>
            <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={handleCloseMenu}>
                {additionalOptions.map(op => (
                    <MenuItem key={op} value={op} onClick={handleMenuOptionSelect(op)}>{op}</MenuItem>
                ))}
            </Menu>
            {OpenForm100Component}
            {OpenPersonComponent}
            {OpenDischargeComponent}
            {ReferralDialog}
        </Container>
    )
};
