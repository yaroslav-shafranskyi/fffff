import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { Menu as MenuIcon, AccountCircleOutlined as AvatarIcon } from '@mui/icons-material';

import { headerStyles, iconWrapperStyles } from "./styles";

export const Header = () => {
    return (
        <Box sx={headerStyles}>
            <Typography variant='h5'>Logo</Typography>
            <Box sx={iconWrapperStyles}>
                <Tooltip title='Меню'>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Профіль'>
                    <IconButton>
                        <AvatarIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};
