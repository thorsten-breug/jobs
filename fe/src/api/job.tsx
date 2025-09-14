import type { Job } from "../types/job"
import { errorMessage } from './error'

export const getJobs = (companyId: number): Promise<Job[]> => {
    return fetch(`${import.meta.env.VITE_API_URL}/job?company=${companyId}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json();
        });
}

export const changeJob = (job: Job): Promise<Job> => {
    return fetch(`${import.meta.env.VITE_API_URL}/job/${job.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json();
        });
}

export const insertJob = (job: Job): Promise<Job> => {
    return fetch(`${import.meta.env.VITE_API_URL}/job`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json();
        });
}

export const deleteJob = (job: Job): Promise<boolean> => {
    return fetch(`${import.meta.env.VITE_API_URL}/job/${job.id}`, {
        method: 'DELETE',
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return true;
        });
}
