import { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default ({title, prompt, handleResponse}: {
    title: string,
    prompt: string,
    handleResponse: (confirm: boolean) => void, 
}) => {
  const [open, setOpen] = useState(true);

  const handleConfirm = () => {
    handleResponse(true);
    setOpen(false);
  };

  const handleAbort = () => {
    handleResponse(false);
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleAbort}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {prompt}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Ja</Button>
          <Button onClick={handleAbort}>Abbrechen</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
