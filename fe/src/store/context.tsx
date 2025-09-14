import { createContext, useReducer, type ReactNode } from "react";
import reducer from './reducer'
import type { Company } from "../types/company";

export type AppState = {
	error: string | null;
	companies: Company[];
}

export const AppContext = createContext({} as {
    state: AppState,
    dispatch: (action: any) => void,
});

// simulate redux store...
export let useDispatch: () => (cb: (dispatch: (action: any) => void, getState: () => AppState) => any) => any;

const initialState: AppState = {
	error: null,
	companies: [],
} 

/**
 * App Context Provider as default export
 */
export default ({ children }: {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useDispatch = () => (cb: (dispatch: (action: any) => void, getState: () => AppState) => any) => cb(dispatch, () => state);

	return (
		<AppContext
			value={{
				state,
				dispatch
			}}>
			{children}
		</AppContext>
	);
}