import * as React from "react"
import Box from '@mui/material/Box';
import ApiButtons from './apiButtons/apiButtons'
import DialogModify from './dialog/modify'
import DialogConfirm from './dialog/confirm'

export enum ModifyMode {
    none = 0,
    insert = 1,
    change = 2,
}

export default ({ children, selection, modify, confirmation, handleModify, handleDelete }:
{
    children: React.ReactNode,
    selection: number,
    modify: (mode: ModifyMode) => { title: string, children: React.ReactNode },
    confirmation: () => { title: string, prompt: string },
    handleModify: (mode: ModifyMode, form: any) => Promise<boolean>
    handleDelete: () => Promise<boolean>
}) => {
    const [dialog, setDialog] = React.useState<ModifyMode>(0);
    const [confirm, setConfirm] = React.useState<boolean>(false);

    const onSubmit = (mode: ModifyMode, form: any) => {
        handleModify(mode, form).then(result => {
            if (result) {
                setDialog(ModifyMode.none);
            }
        });
    }
    const onInsert = () => {
        setDialog(ModifyMode.insert);
    }
    const onChange = () => {
        setDialog(ModifyMode.change);
    }
    const onDelete = () => {
        setConfirm(true);
    }
    const onDeleteConfirm = (confirm: boolean) => {
        if (confirm) {
            handleDelete().then(result => {
                if (result) {
                    setDialog(ModifyMode.none);
                }
            });
        }
        setConfirm(false);
    }    

    return (
        <>
            <Box component="section" sx={{ border: 1 }}>
                {children}
                <ApiButtons
                    canModify={selection > 0}
                    clickHandlerInsert={onInsert}
                    clickHandlerChange={onChange}
                    clickHandlerDelete={onDelete}
                />
                {dialog !== ModifyMode.none && (
                    <DialogModify 
                        { ...modify(dialog) }
                        handleClose={() => setDialog(ModifyMode.none)}
                        handleSubmit={(form) => onSubmit(dialog, form)}
                    />
                )}
                {confirm && (
                    <DialogConfirm 
                        { ...confirmation() }
                        handleResponse={onDeleteConfirm}
                    />
                )}
            </Box>
        </>
    )    
}