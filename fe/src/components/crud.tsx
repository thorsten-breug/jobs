import { type ReactNode, useState } from "react"
import Box from '@mui/material/Box';
import ApiButtons from './apiButtons/apiButtons'
import DialogModify from './dialog/modify'
import DialogConfirm from './dialog/confirm'

export enum ModifyMode {
    none = 0,
    insert = 1,
    change = 2,
}

export default <T extends unknown>({ children, selection, modify, confirmation, handleModify, handleDelete }:
{
    children: ReactNode,
    selection: () => T | undefined,
    modify: (mode: ModifyMode) => { title: string, children: ReactNode },
    confirmation?: () => { title: string, prompt: string },
    handleModify: (mode: ModifyMode, form: any) => Promise<boolean>
    handleDelete: () => Promise<boolean>
}) => {
    const [dlgMode, setDlgMode] = useState<ModifyMode>(0);
    const [confirm, setConfirm] = useState<boolean>(false);

    const onSubmit = (mode: ModifyMode, form: any) => {
        handleModify(mode, form).then(result => {
            if (result) {
                setDlgMode(ModifyMode.none);
            }
        });
    }
    const onInsert = () => {
        setDlgMode(ModifyMode.insert);
    }
    const onChange = () => {
        setDlgMode(ModifyMode.change);
    }
    const onDelete = () => {
        if (confirmation) {
            setConfirm(true);
        } else {
            onDeleteConfirm(true);
        }
    }
    const onDeleteConfirm = (confirm: boolean) => {
        if (confirm) {
            handleDelete().then(result => {
                if (result) {
                    setDlgMode(ModifyMode.none);
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
                    canModify={!!selection()}
                    clickHandlerInsert={onInsert}
                    clickHandlerChange={onChange}
                    clickHandlerDelete={onDelete}
                />
                {dlgMode !== ModifyMode.none && (
                    <DialogModify 
                        { ...modify(dlgMode) }
                        handleClose={() => setDlgMode(ModifyMode.none)}
                        handleSubmit={(form) => onSubmit(dlgMode, form)}
                    />
                )}
                {confirm && (
                    <DialogConfirm 
                        { ...confirmation!() }
                        handleResponse={onDeleteConfirm}
                    />
                )}
            </Box>
        </>
    )    
}