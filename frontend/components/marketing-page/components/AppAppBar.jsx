import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import { LMSIcon } from "../../sign-in-side/components/CustomIcons"; // your logo

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (v) => () => setOpen(v);

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* LEFT SIDE */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
            <LMSIcon />

            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3, gap: 1 }}>
              <Button color="info" variant="text" size="small">Home</Button>
              <Button color="info" variant="text" size="small">About Us</Button>
              <Button color="info" variant="text" size="small">Courses</Button>
              <Button color="info" variant="text" size="small">Blog</Button>
              <Button color="info" variant="text" size="small">Contact Us</Button>
              <Button color="info" variant="text" size="small">FAQ</Button>
            </Box>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              href="/login"
            >
              Login
            </Button>
            <ColorModeIconDropdown />
          </Box>

          {/* MOBILE */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{ sx: { top: "var(--template-frame-height, 0px)" } }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>About Us</MenuItem>
                <MenuItem>Courses</MenuItem>
                <MenuItem>Blog</MenuItem>
                <MenuItem>Contact Us</MenuItem>
                <MenuItem>FAQ</MenuItem>

                <Divider sx={{ my: 3 }} />

                <MenuItem>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    href="/login"
                  >
                    Login
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}