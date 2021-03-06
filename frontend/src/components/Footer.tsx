import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#393e46',
    zIndex: 3,
    overflow: 'hidden',
  },
  footerText: {
    color: '#eeeeee',
    cursor: 'pointer',
    marginTop: '1.2rem',
    fontSize: '.8rem',
  },
});

export const Footer: React.FC<any> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <p
        className={classes.footerText}
        onClick={() =>
          window.open('https://github.com/jdtoombs/InventoryLookup')
        }
      >
        github.com/jdtoombs/InventoryLookup
      </p>
    </BottomNavigation>
  );
};
