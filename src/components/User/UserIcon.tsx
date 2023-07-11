import { useState, MouseEvent } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import {
  SettingsOutlined as SettingsIcon,
  AccountCircleOutlined as AvatarIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { UserType, useGetUser, useLogout } from "../../api";
import { userUrl } from "../../constants";
import { useOpenFormDialog } from "../OpenForm";

import {
  menuButtonsWrapperStyles,
  menuItemStyles,
  menuPaperStyles,
  menuStyles,
  updateUserButtonStyles,
} from "./styles";
import { ManageUsers } from "./ManageUsers";
import { ManageUserMode } from "./types";

export const UserIcon = () => {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const logout = useLogout();

  const user = useGetUser();
  const { fullName, position, user: login, role, id } = user;

  const isSuperAdmin = role === UserType.SUPER_ADMIN;

  const [OpenUserComponent, handleOpenUser] = useOpenFormDialog(ManageUsers);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUserMenuAnchorEl(null);
  };

  const goToUser = () => {
    if (id !== undefined) {
      navigate(`${userUrl}/${id}`);
      handleCloseUserMenu();
    }
  };

  const openUser = (mode: ManageUserMode) => () => {
    handleOpenUser({ mode });
    handleCloseUserMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <AvatarIcon />
      </IconButton>
      <Menu
        open={!!userMenuAnchorEl}
        anchorEl={userMenuAnchorEl}
        slotProps={{
          paper: { sx: menuPaperStyles },
        }}
        MenuListProps={{
          sx: menuStyles,
        }}
        onClose={handleCloseUserMenu}
      >
        <AvatarIcon />
        <Typography>{fullName ?? login}</Typography>
        {!!position && (
          <Typography color="textSecondary">{position}</Typography>
        )}
        {isSuperAdmin && (
          <Box sx={menuButtonsWrapperStyles}>
            <Button
              variant="contained"
              color="inherit"
              onClick={openUser(ManageUserMode.CREATE)}
            >
              Додати користувача
            </Button>
            <Button
              variant="contained"
              sx={updateUserButtonStyles}
              onClick={openUser(ManageUserMode.UPDATE)}
            >
              Редагувати користувача
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={openUser(ManageUserMode.REMOVE)}
            >
              Видалити користувача
            </Button>
          </Box>
        )}
        <MenuItem sx={{ width: "100%" }} onClick={goToUser}>
          <Box sx={menuItemStyles}>
            <SettingsIcon />
            <Typography>Налаштування</Typography>
          </Box>
        </MenuItem>
        <MenuItem sx={{ width: "100%" }} onClick={logout}>
          <Box sx={menuItemStyles}>
            <LogoutIcon />
            <Typography>Вийти</Typography>
          </Box>
        </MenuItem>
      </Menu>
      {OpenUserComponent}
    </>
  );
};
