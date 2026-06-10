import type { Company } from "../types/company"
import { errorMessage } from './error'
import authorization from './authorization'

export const getCompanies = (page: number, size: number): Promise<Response> => {
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/company?page=${page}&size=${size}`, {
        headers: authorizationHeaders
    })
        .then(async response => {
            if (!response.ok) {
                throw new Error(await errorMessage(response));
            }
            return response;
        });
}

export const changeCompany = (company: Company): Promise<Company> => {
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/company/${company.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorizationHeaders
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
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/company`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...authorizationHeaders
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
    const authorizationHeaders = authorization();
    return fetch(`${import.meta.env.VITE_API_URL}/company/${company.id}`, {
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
