import {
  AppBar,
  Avatar,
  Button,
  createStyles,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import csgo from '../static/images/csgo.jpg';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      color: '#00adb5',
    },
    help: {
      color: '#eeeeee',
    },
  })
);

/** Navigation bar to be used on every screen of the application */
export const NavigationBar: React.FC<any> = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
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
              <Avatar className={classes.game} alt="game" src={csgo} />
            </IconButton>
            <Typography variant="h6" className="navbar-title">
              Inventory Lookup
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            {/* TODO: better help */}
            <Tooltip
              arrow
              title="You may enter a steam vanity name if the user has it set up or their Steam 64 bit Id."
            >
              <IconButton aria-label="Help">
                <HelpOutlineIcon className={classes.help} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* TODO: Switch between games to browse different inventories */}
      <Drawer open={showSidePanel}>
        <Button onClick={() => setShowSidePanel(false)}>Close</Button>
      </Drawer>
    </>
  );
};
