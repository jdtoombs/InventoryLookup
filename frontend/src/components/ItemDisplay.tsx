import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';
import React from 'react';

interface IItemDisplay {
  item: any;
  itemOnClick?: () => void;
  toolTip?: string;
  preText: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemDisplay: {
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
    image: {
      marginTop: '5px',
      marginRight: '5px',
    },
  })
);

export const ItemDisplay: React.FC<IItemDisplay> = ({
  item,
  itemOnClick,
  toolTip,
  preText,
}) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip arrow title={toolTip ?? item.name}>
        <div className={classes.itemDisplay} onClick={itemOnClick}>
          <Avatar className={classes.image} src={item.image} />
          <p className={classes.text}>{`${preText} $${item.price} USD`}</p>
        </div>
      </Tooltip>
    </>
  );
};
