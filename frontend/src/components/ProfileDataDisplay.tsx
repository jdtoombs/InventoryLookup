import { Avatar, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

/** TODO: Play with sizing so it doesn't look out of place  */

interface IProfileData {
  /** the total worth of the inventory */
  inventoryWorth: number;
  /** the image src for profile's avatar */
  avatarSrc: string;
  /** the username of the inventory being viewed */
  userName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dataDisplay: {
      padding: '5px',
      border: '1px solid #00adb5',
      borderRadius: '522px',
      display: 'flex',
      marginBottom: '10px',
      marginRight: '5px',
    },
    text: {
      color: '#eeeeee',
    },
    avatar: {
      marginTop: '5px',
      marginRight: '5px',
    },
  })
);

const makePossessive = (userName: string) => {
  if (userName.endsWith('s')) {
    return `${userName}'`;
  } else {
    return `${userName}'s`;
  }
};

/** similar component to material ui chip but larger for display purposes */
export const ProfileDataDisplay: React.FC<IProfileData> = ({
  inventoryWorth,
  avatarSrc,
  userName,
}) => {
  const classes = useStyles();
  /** only want 2 decimal places */
  const formattedInventoryWorth = Math.round(inventoryWorth * 100) / 100;

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <div className={classes.dataDisplay}>
          <Avatar className={classes.avatar} src={avatarSrc} />
          <p className={classes.text}>{`${makePossessive(
            userName
          )} inventory is worth $${formattedInventoryWorth} USD`}</p>
        </div>
      </Grid>
    </>
  );
};
