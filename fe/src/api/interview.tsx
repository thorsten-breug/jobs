import type { Interview } from "../types/interview"
import { errorMessage } from './error'
import authorization from './authorization'

export const getInterviews = (jobId: number): Promise<Interview[]> => {
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/interview?job=${jobId}`, {
        headers: authorizationHeaders
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json().then((json: any[]) => json.map((interview) => ({
                ...interview,
                date: new Date(interview.date),
            })));
        });
}

export const changeInterview = (interview: Interview): Promise<Interview> => {
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/interview/${interview.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorizationHeaders
        },
        body: JSON.stringify(interview),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json().then((interview) => ({
                ...interview,
                date: new Date(interview.date),
            }));
        });
}

export const insertInterview = (interview: Interview): Promise<Interview> => {
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/interview`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorizationHeaders
        },
        body: JSON.stringify(interview),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json().then((interview) => ({
                ...interview,
                date: new Date(interview.date),
            }));
        });
}

export const deleteInterview = (interview: Interview): Promise<boolean> => {
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/interview/${interview.id}`, {
        method: 'DELETE',
        headers: authorizationHeaders
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return true;
        });
}
