import Button from '@mui/material/Button';
import './apiButtons.css'

export default ({
    canModify, 
    clickHandlerInsert, 
    clickHandlerChange, 
    clickHandlerDelete
}: {canModify: boolean,
    clickHandlerInsert: () => void,
    clickHandlerChange: () => void,
    clickHandlerDelete: () => void,
}) => (
    <div className="apiButtons">
        <Button onClick={clickHandlerInsert}>Neu</Button>
        <Button onClick={clickHandlerChange} disabled={!canModify}>Ändern</Button>
        <Button onClick={clickHandlerDelete} disabled={!canModify}>Löschen</Button>
    </div>
)
