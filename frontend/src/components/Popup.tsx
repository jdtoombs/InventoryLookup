import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface IPopup {
    /** define the body/message for the popup */
    body?: string;
    /** define the title of the popup */
    title?: string;
    /** control show state from calling component */
    show: boolean;
    /** control close state from calling component */
    close?: boolean;
    /** determine the button text */
    buttonText?: string;
}

/** creating the default/generic popup to be used throughout the application */
export const Popup: React.FC<IPopup> =({body, title, show, close, buttonText})=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            <p id="transition-modal-description">{body}</p>
            <Button onClick={()=> setOpen(false)}>{buttonText ? buttonText : 'Ok'}</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}