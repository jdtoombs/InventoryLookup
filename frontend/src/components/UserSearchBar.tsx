import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';


interface IUserSearchBar {
  fieldDescription?: any;
}

const FormatUserBar = styled(TextField)`
  margin-top: 20px;
  margin-bottom: 10px;
`;

/** component used to gather the desired steam id, and inventory items */
export const UserSearchBar: React.FC<IUserSearchBar> = ({
  fieldDescription,
}) => {
  const [userId, setUserId] = useState("");
  

  const history = useHistory();

  const handleSearch =()=> {
    history.push(`/items/${userId}`)
  }

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <FormatUserBar
          variant="outlined"
          type="search"
          label="Enter Steam 64-Bit Id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Grid container direction="row" justify="center" alignItems="center">
          <Button onClick={()=> handleSearch()} variant="outlined" color="primary">
            Search
          </Button>
          <Button onClick={()=>setUserId("")} variant="outlined" color="secondary" style={{marginLeft: 10}}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
