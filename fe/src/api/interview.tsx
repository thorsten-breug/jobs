import type { Interview } from "../types/interview"
import { errorMessage } from './error'

export const getInterviews = (jobId: number): Promise<Interview[]> => {
    return fetch(`${import.meta.env.VITE_API_URL}/interview?job=${jobId}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json().then((json: any[]) => json.map((i) => ({
                ...i,
                date: new Date(i.date),
            })));
        });
}

export const changeInterview = (interview: Interview): Promise<Interview> => {
    return fetch(`${import.meta.env.VITE_API_URL}/interview/${interview.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(interview),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json().then((json) => ({
                ...json,
                date: new Date(json.date),
            }));
        });
}

export const insertInterview = (interview: Interview): Promise<Interview> => {
    return fetch(`${import.meta.env.VITE_API_URL}/interview`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(interview),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json().then((json) => ({
                ...json,
                date: new Date(json.date),
            }));
        });
}

export const deleteInterview = (interview: Interview): Promise<boolean> => {
    return fetch(`${import.meta.env.VITE_API_URL}/interview/${interview.id}`, {
        method: 'DELETE',
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return true;
        });
}
