import type { Company } from "../types/company"
import { errorMessage } from './error'

export const getCompanies = (page: number, size: number): Promise<Response> => {
    return fetch(`${import.meta.env.VITE_API_URL}/company?page=${page}&size=${size}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response;
        });
}

export const changeCompany = (company: Company): Promise<Company> => {
    return fetch(`${import.meta.env.VITE_API_URL}/company/${company.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(company),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json();
        });
}

export const insertCompany = (company: Company): Promise<Company> => {
    return fetch(`${import.meta.env.VITE_API_URL}/company`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(company),
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response.json();
        });
}

export const deleteCompany = (company: Company): Promise<boolean> => {
    return fetch(`${import.meta.env.VITE_API_URL}/company/${company.id}`, {
        method: 'DELETE',
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return true;
        });
}
