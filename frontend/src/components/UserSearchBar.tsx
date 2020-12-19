import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import * as service from '../api/service';
import { useHistory } from 'react-router-dom';

interface IUserSearchBar {
  fieldDescription?: any;
}

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#eeeeee',
    },
    '& .MuiOutlinedInput-input': {
      color: '#eeeeee',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: '#eeeeee',
    },
    '& .MuiInputLabel-outlined': {
      color: '#eeeeee',
    },
  },
  searchButton: {
    color: '#00adb5',
    borderColor: '#00adb5',
  },
  clearButton: {
    marginLeft: 10,
  },
});

/** component used to gather the desired steam id, and inventory items */
export const UserSearchBar: React.FC<IUserSearchBar> = ({
  fieldDescription,
}) => {
  const [userId, setUserId] = useState('');

  const classes = useStyles();
  const history = useHistory();

  const handleSearch = () => {
    if (/[a-zA-Z]/g.test(userId)) {
      service.getUserBitId({ vanityName: userId }).then((res) => {
        history.push(`/items/${res?.response.steamid}`);
      });
    } else {
      history.push(`/items/${userId}`);
    }
  };

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <TextField
            variant="outlined"
            type="search"
            className={classes.root}
            label="Enter Steam Id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <Button
            className={classes.searchButton}
            onClick={() => handleSearch()}
            variant="outlined"
          >
            Search
          </Button>
          <Button
            className={classes.clearButton}
            onClick={() => setUserId('')}
            variant="outlined"
            color="secondary"
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
