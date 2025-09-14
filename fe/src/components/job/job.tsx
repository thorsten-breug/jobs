import { useEffect, useState } from "react"
import type { Company } from "../../types/company"
import type { Job } from "../../types/job"
import Crud, { ModifyMode } from '../crud'
import Interview from '../interview/interview'
import { getJobs, changeJob, deleteJob, insertJob } from '../../api/job'
import { List, ListItemButton, ListItemText, TextField, Checkbox, FormControlLabel } from "@mui/material"

const dialog = (job: Job) => (
    <>
        <TextField
            autoFocus
            required
            name="title"
            label="Bezeichnung"
            defaultValue={job.title}
            fullWidth
            variant="standard"
        />
        <TextField
            name="remarks"
            label="Bemerkung"
            defaultValue={job.remarks}
            fullWidth
            variant="standard"
        />
            <FormControlLabel control={
            <Checkbox 
                defaultChecked={job.closed} 
                name="closed"
            />
        } label="Geschlossen" />
    </>
)

export default ({ company }: { company: Company }) => {

    const [jobs, setJobs] = useState<Job[]>([]);
    const [selection, setSelection] = useState(-1)

    useEffect(() => {
        setSelection(-1);
        getJobs(company.id).then(jobs => {
            setJobs(jobs);
            if (jobs.length > 0) {
                setSelection(jobs[0].id);
            }
        })
    }, [company])

    const getSelectedItem = () => jobs.find((job: Job) => job.id === selection)
    const handleModify = (mode: ModifyMode, form: any) => {
        const job = { ...(mode === ModifyMode.change ? getSelectedItem() : { company_id: company.id }), ...form, closed: form.closed === 'on' };
        const promise: (job: Job) => Promise<Job> = (mode === ModifyMode.change) ? changeJob : insertJob;
        return promise(job).then(job => {
            if (mode === ModifyMode.change) {
                setJobs(jobs.map(j => j.id === job.id ? job : j));
            } else {
                const clone = [ ...jobs ];
                clone.push(job);
                setJobs(clone);
            }
            setSelection(job.id);
            return true;
        });
    }
    const handleDelete = () => {
        const job = getSelectedItem()!;
        return deleteJob(job).then(() => {
            setJobs(jobs.filter(j => j.id !== job.id));
            setSelection(-1);
            return true;
        })
    }
    
    return (
        <>
            <div className="jobs">
                <Crud
                    selection={selection}
                    modify={(mode: ModifyMode) => {
                        const job = mode === ModifyMode.change ? getSelectedItem()! : {
                            id: 0,
                            company_id: company.id,
                            title: "",
                            remarks: "",
                            closed: false,
                        };
                        return {
                            title: "Job " + (mode === ModifyMode.change ? "ändern" : "- Neueingabe"),
                            children: dialog(job),
                        };
                    }}
                    confirmation={() => ({
                        title: "Job löschen",
                        prompt: `Sicher, dass '${getSelectedItem()!.title}' gelöscht werden soll?`,
                    })}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
                >
                    <h4>Jobs</h4>
                    <List component="nav">
                        {jobs.map((job: Job) => (
                            <ListItemButton 
                                key={job.id}
                                selected={selection === job.id}
                                onClick={() => setSelection(job.id)}
                            >
                                <ListItemText primary={job.title} />
                            </ListItemButton>  
                        ))}
                    </List>
                </Crud>            
            </div>
            {selection > 0 && jobs.findIndex((job) => job.id === selection) >= 0 && (
                <Interview job={getSelectedItem()!} />
            )}
        </>
    )
}