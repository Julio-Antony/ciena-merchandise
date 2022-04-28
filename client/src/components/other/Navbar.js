import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const settings = [
  { title: "Profile", url: "/profile", icon: PersonIcon },
  { title: "Setting", url: "/setting", icon: SettingsIcon },
  { title: "Logout", url: "/", icon: PowerSettingsNewIcon },
];

const Navbar = ({user}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!isAuthenticated) {
    return "";
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" style={{ marginTop: "10px" }}>
        Home
      </Link>
      {user && <Box sx={{ flexGrow: 0 }}>
        <Stack direction="row" spacing={2}>
          <Typography color="white" mt={1}>{user.name}</Typography>
          <Tooltip title="user menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user.avatar}
                src={"data:image/png;base64," + user.avatar}
              />
            </IconButton>
          </Tooltip>
        </Stack>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem
              key={index}
              onClick={
                setting.title === "Logout" ? () => dispatch(logout()) : null
              }
            >
                <Stack direction="row" spacing={1}>
                  <setting.icon />
              <Link to={setting.url} className="avatar-menu">
                  {setting.title}
              </Link>
                </Stack>
            </MenuItem>
          ))}
        </Menu>
      </Box>}
    </nav>
  );
};

export default Navbar;
