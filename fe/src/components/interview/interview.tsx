import { useEffect, useState } from "react"
import type { Interview } from "../../types/interview"
import type { Job } from "../../types/job"
import Crud, { ModifyMode } from '../crud'
import { getInterviews, changeInterview, deleteInterview, insertInterview } from '../../api/interview'
import { List, ListItemButton, TextField } from "@mui/material"
import { dateToLocalDateTimeString } from "../../utils"

const dialog = (interview: Interview) => (
    <>
        <TextField
            autoFocus
            required
            name="url"
            label="URL"
            defaultValue={interview.url}
            fullWidth
            variant="standard"
        />
        <TextField
            name="remarks"
            label="Bemerkung"
            defaultValue={interview.remarks}
            fullWidth
            variant="standard"
        />
        <TextField
            required
            name="date"
            label="Datum und Uhrzeit"
            type="datetime-local"
            defaultValue={dateToLocalDateTimeString(interview.date)}
            fullWidth
            variant="standard"
        />
    </>
)

export default ({ job }: { job: Job }) => {

    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [selection, setSelection] = useState(-1)

    useEffect(() => {
        setSelection(-1);
        getInterviews(job.id).then(interviews => setInterviews(
            interviews.sort((a, b) => a.date.getTime() - b.date.getTime())
        ))
    }, [job])

    const getSelectedItem = () => interviews.find((interview) => interview.id === selection)
    const handleModify = (mode: ModifyMode, form: any) => {
        const date = form.date ? new Date(form.date) : new Date();
        const interview = { ...(mode === ModifyMode.change ? getSelectedItem() : { job_id: job.id }), ...form, date };
        const promise: (interview: Interview) => Promise<Interview> = (mode === ModifyMode.change ? changeInterview : insertInterview);
        return promise(interview).then(interview => {
            if (mode === ModifyMode.change) {
                setInterviews(interviews.map(i => i.id === interview.id ? interview : i));
            } else {
                const clone = [ ...interviews ];
                clone.push(interview);
                setInterviews(clone);
            }
            setSelection(interview.id);
            return true;
        });
    }
    const handleDelete = () => {
        const interview = getSelectedItem()!;
        return deleteInterview(interview).then(() => {
            setInterviews(interviews.filter(i => i.id !== interview.id));
            setSelection(-1);
            return true;
        })
    }
    
    return (
        <>
            <div className="interviews">
                <Crud
                    selection={selection}
                    modify={(mode: ModifyMode) => {
                        const interview = mode === ModifyMode.change ? getSelectedItem()! : {
                            id: 0,
                            job_id: job.id,
                            url: "",
                            remarks: "",
                            date: new Date(),
                        };
                        return {
                            title: "Interview " + (mode === ModifyMode.change ? "ändern" : "- Neueingabe"),
                            children: dialog(interview)
                        };
                    }}
                    confirmation={() => ({
                        title: "Job löschen",
                        prompt: `Sicher, dass '${new Date(getSelectedItem()!.date).toLocaleTimeString('de-DE')}' gelöscht werden soll?`,
                    })}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
                >
                    <h4>Interviews</h4>
                    <List component="nav">
                        {interviews.map((interview: Interview) => (
                            <ListItemButton 
                                key={interview.id}
                                selected={selection === interview.id}
                                onClick={() => setSelection(interview.id)}
                            >
                                <div style={{ whiteSpace: "nowrap" }}>
                                    {new Date(interview.date).toLocaleDateString('de-DE', { 
                                        day: "2-digit", month: "2-digit", year: 'numeric', 
                                        hour: "2-digit", minute: "2-digit" })
                                    } Uhr:&nbsp;
                                </div>
                                <a href={interview.url} target="_blank">{interview.url}</a>
                            </ListItemButton>  
                        ))}
                    </List>
                </Crud>  
            </div>          
        </>
    )
}
