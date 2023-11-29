"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { generateRandomKey } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);
  const router = useRouter();

  const pages = [
    {
      label: "Servicios",
      onclick: () => {
        console.log("hola");
      },
    },
    {
      label: "Unidades",
      onclick: () => {
        console.log("hola");
      },
    },
  ];
  const settingsUser = [
    {
      label: "Dashboard",
      onclick: () => {
        console.log("hola");
      },
    },
    {
      label: "Cerrar sesión",
      onclick: () => {
        desconectarse();
      },
    },
  ];

  const settingsNotUser = [
    {
      label: "Ingresar",
      onclick: () => {
        router.push("/ingreso");
      },
      onlyAdmin: true,
    },
    {
      label: "Registrarse",
      onclick: () => {
        router.push("/registro");
      },
    },
  ];

  const desconectarse = () => {
    dispatch(logOut());
    router.push("/");
    toast.success("Se ha deslogueado correctamente", {
      position: "top-center",
      autoClose: 3000,
      // hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GoViajes
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={generateRandomKey()}
                  onClick={() => {
                    handleCloseNavMenu;
                    page.onclick();
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GoViajes
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={generateRandomKey()}
                onClick={() => {
                  handleCloseNavMenu;
                  page.onclick();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              <>
                {!user.isAuthenticated ? (
                  <>
                    {settingsNotUser.map((setting) => (
                      <MenuItem
                        key={generateRandomKey()}
                        onClick={() => {
                          handleCloseUserMenu;
                          setting.onclick();
                        }}
                      >
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    {settingsUser.map((setting) => (
                      <MenuItem
                        key={generateRandomKey()}
                        onClick={() => {
                          handleCloseUserMenu;
                          setting.onclick();
                        }}
                      >
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </>
                )}
              </>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
