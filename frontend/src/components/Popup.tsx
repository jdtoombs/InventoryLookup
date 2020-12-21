import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#393e46',
      color: '#eeeeee',
      border: '2px solid',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      color: '#eeeeee',
      border: '2px solid #eeeeee',
    },
    errorIcon: {
      color: '#f50057',
    },
  })
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
  /** handle show from parent */
  setShow: (val: boolean) => void;
  /** the action to perform when the user clicks ok on popup */
  okAction: () => void;
  /** indicate whether the popup is being used as an error */
  error?: boolean;
}

/** creating the default/generic popup to be used throughout the application */
export const Popup: React.FC<IPopup> = ({
  body,
  title,
  show,
  close,
  buttonText,
  okAction,
  setShow,
  error,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setShow(false);
  };

  const handleOk = () => {
    okAction();
    setShow(false);
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
        <Fade in={show}>
          <div className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {error && <ErrorOutlineIcon className={classes.errorIcon} />}
              <h2 id="transition-modal-title">{title}</h2>
            </Grid>
            <p id="transition-modal-description">{body}</p>
            <Button className={classes.button} onClick={() => handleOk()}>
              {buttonText ? buttonText : 'Ok'}
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
