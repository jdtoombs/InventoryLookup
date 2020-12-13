import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

export const NavigationBar: React.FC<any> = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const history = useHistory();

  return (
    <>
      <AppBar style={{ marginBottom: 20 }} position="static">
        <Toolbar>
          {/* TODO: allow user to switch between CSGO and RUST for inventory searching via clicking this button */}
          <IconButton
            edge="start"
            className="home-button"
            color="inherit"
            style={{marginRight: 5}}
            aria-label="home"
            onClick={() => history.push('/')}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            edge="start"
            className="menu-button"
            color="inherit"
            aria-label="menu"
            onClick={() => setShowSidePanel(!showSidePanel)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="navbar-title">
            Inventory Lookup
          </Typography>
        </Toolbar>
      </AppBar>
      {/* TODO: Switch between games to browse different inventories */}
      <Drawer open={showSidePanel}>
        <Button onClick={() => setShowSidePanel(false)}>Close</Button>
      </Drawer>
    </>
  );
};
