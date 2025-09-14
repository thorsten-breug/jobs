import * as apiCompany from '../api/company'
import type { Company } from "../types/company";

export const enum AppAction {
    ERROR          = 'ERROR',
    COMPANY_INIT   = 'COMPANY_INIT',
    COMPANY_APPEND = 'COMPANY_APPEND',
    COMPANY_CHANGE = 'COMPANY_CHANGE',
    COMPANY_DELETE = 'COMPANY_DELETE',
}

export const getCompanies = () => (dispatch: (action: any) => void): Promise<void | Company[]> => {
    return apiCompany.getCompanies()
        .then((companies) =>  {
            dispatch({
                type: AppAction.COMPANY_INIT,
                companies,
            })
            return companies;
        })
        .catch((error: Error) => {
            dispatch({
                type: AppAction.ERROR,
                error: error.message,
            })
        })
}

export const changeCompany = (company: Company) => (dispatch: (action: any) => void) => {
    return apiCompany.changeCompany(company)
        .then((company) =>  {
            dispatch({
                type: AppAction.COMPANY_CHANGE,
                company,
            })
            return company;
        })
        .catch((error: Error) => {
            dispatch({
                type: AppAction.ERROR,
                error: error.message,
            })
        })
}

export const insertCompany = (company: Company) => (dispatch: (action: any) => void) => {
    return apiCompany.insertCompany(company)
        .then((company) =>  {
            dispatch({
                type: AppAction.COMPANY_APPEND,
                company,
            })
            return company;
        })
        .catch((error: Error) => {
            dispatch({
                type: AppAction.ERROR,
                error: error.message,
            })
        })
}

export const deleteCompany = (company: Company) => (dispatch: (action: any) => void) => {
    return apiCompany.deleteCompany(company)
        .then(() =>  {
            dispatch({
                type: AppAction.COMPANY_DELETE,
                id: company.id,
            })
            return true;
        })
        .catch((error: Error) => {
            dispatch({
                type: AppAction.ERROR,
                error: error.message,
            })
            return false;
        })
}