import { AppAction } from "./action";
import type { AppState } from "./context";

/** 
 * Reducer for @interface AppContext
 * Dispatched actions for TaskContext will pass here
 * @returns new state with all companies
 */
export default (state: AppState, action: any): AppState => {
	switch (action.type) {
		case AppAction.ERROR: {
			return {
				...state,
				error: action.error,
			}
		}
        case AppAction.COMPANY_INIT: {
            return { 
				...state,
				companies: action.companies,
			};
        }
		case AppAction.COMPANY_APPEND: {
			// append new company
			return {
				...state,
				companies: [
					...state.companies,
					action.company,
				]
			};
		}
		case AppAction.COMPANY_CHANGE: {
			// update company
			return {
				...state,
				companies: state.companies.map((company) => (company.id === action.company.id) ? action.company : company),
			};
		}
		case AppAction.COMPANY_DELETE: {
			// delete company
			return {
				...state,
				companies: state.companies.filter((company) => company.id !== action.id),
			};
		}
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}
}