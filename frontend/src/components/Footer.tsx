import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export const Footer: React.FC<any> =()=> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
      style={{position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#3f51b5', zIndex: 3}}
    >
    <p style={{color: 'white'}}>2020</p>
    </BottomNavigation>
  );
}