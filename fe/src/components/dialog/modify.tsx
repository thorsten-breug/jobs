import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default ({title, children, handleClose, handleSubmit}: {
    title: string, 
    children: React.ReactNode
    handleClose: () => void,
    handleSubmit: (formJson: any) => void, 
}) => {

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        handleSubmit(formJson);
    };

    return (
        <React.Fragment>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit} id="ModifyDialog">
                        {children}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" form="ModifyDialog">OK</Button>
                    <Button onClick={handleClose}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
