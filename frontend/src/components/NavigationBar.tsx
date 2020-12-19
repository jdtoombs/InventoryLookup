import {
  AppBar,
  Avatar,
  Button,
  createStyles,
  Drawer,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import csgo from '../static/images/csgo.jpg'

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    marginBottom: 20,
    backgroundColor: '#393e46',
  },
  homeIcon: {
    marginRight: 5,
  },
  game: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: '#00adb5'
  }
}));

/** Navigation bar to be used on every screen of the application */
export const NavigationBar: React.FC<any> = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          {/* TODO: allow user to switch between CSGO and RUST for inventory searching via clicking this button */}
          <IconButton
            edge="start"
            className={classes.homeIcon}
            color="inherit"
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
            {/* TODO: Replace with actual icon */}
            <Avatar className={classes.game} alt='game' src={csgo}/>
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
