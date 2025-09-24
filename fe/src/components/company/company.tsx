import Pagination from "react-paginate"
import { useContext, useEffect, useState } from "react"
import { AppContext, useDispatch, type AppState } from "../../store/context"
import type { Company } from "../../types/company"
import Job from '../job/job'
import Crud, { ModifyMode } from '../crud'
import { AppAction, getCompanies } from "../../store/action"
import { List, ListItemButton, ListItemText, TextField } from "@mui/material"
import { changeCompany, insertCompany, deleteCompany } from '../../store/action'
import './company.css'

const dialog = (company: Company) => (
    <>
        <TextField
            autoFocus
            required
            name="name"
            label="Name"
            defaultValue={company.name}
            fullWidth
            variant="standard"
        />
        <TextField
            name="city"
            label="Stadt"
            defaultValue={company.city}
            fullWidth
            variant="standard"
        />
        <TextField
            name="street"
            label="Strasse"
            defaultValue={company.street}
            fullWidth
            variant="standard"
        />
        <TextField
            name="zip"
            label="PLZ"
            defaultValue={company.zip}
            fullWidth
            variant="standard"
        />
        <TextField
            name="contact"
            label="Kontakt"
            defaultValue={company.contact}
            // type="email"
            fullWidth
            variant="standard"
        />
    </>
)

export default () => {

    const dispatch = useDispatch();
    const {state: {companies, error}, dispatch: disp} = useContext(AppContext)
    const [selection, setSelection] = useState(-1)
    const [pageCount, setPageCount] = useState(0); // Total number of pages
    const [currentPage, setCurrentPage] = useState(0); // Current page
    const [elementsPerPage, setElementsPerPage] = useState(50);

    const getSelectedItem = () => companies.find(item => item.id === selection);
    const handleModify = (mode: ModifyMode, form: any): Promise<boolean> => {
        const company = { ...(mode === ModifyMode.change ? getSelectedItem() : {}), ...form };
        const promise: (company: Company) => (dispatch: (action: any) => void, getState: () => AppState) => Promise<Company | void> 
            = company.id ? changeCompany : insertCompany;
        return dispatch(promise(company)).then((company: Company) => {
            if (company) {
               setSelection(company.id); 
            }
            return !!company;
        });
    }
    const handleDelete = (): Promise<boolean> => {
        const company = getSelectedItem()!;
        return dispatch(deleteCompany(company)).then((ok: boolean) => {
            if (ok) {
                setSelection(-1);
            }
            return ok;
        });
    }

    useEffect(() => {
        dispatch(getCompanies(currentPage, elementsPerPage)).then((count: number) => {
            setPageCount(Math.ceil(count / elementsPerPage));
        });
    }, [elementsPerPage, currentPage]);

    useEffect(() => {
        if (error) {
            // clear error in store
            disp({
                type: AppAction.ERROR,
                error: null,
            })
            alert(error);
        }
    }, [error])

    return (
        <>
            <div className="companies">
                <Crud
                    selection={selection}
                    modify={(mode: ModifyMode) => {
                        const company = mode === ModifyMode.change ? getSelectedItem()! : {
                            id: 0,
                            name: "",
                            city: "",
                            street: "",
                            zip: "",
                            contact: "",
                        };
                        return {
                            title: "Firma " + (mode === ModifyMode.change ? "ändern" : "- Neueingabe"),
                            children: dialog(company),
                        };
                    }}
                    confirmation={() => ({
                        title: "Firma löschen",
                        prompt: `Sicher, dass '${getSelectedItem()!.name}' gelöscht werden soll?`,
                    })}
                    handleModify={handleModify}
                    handleDelete={handleDelete}
                >
                    <h4>Firmen</h4>
                    <div className="pagination-size">
                        <label htmlFor="pagination-size">Anzahl Elemente pro Seite:&nbsp;</label>
                        <select 
                            name="pagination-size"
                            value={elementsPerPage.toString()}
                            onChange={(event) => {
                                setCurrentPage(0);
                                setElementsPerPage(+event.target.value);
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <List component="nav">
                        {companies.sort((a, b) => a.name.localeCompare(b.name)).map((company: Company) => (
                            <ListItemButton 
                                key={company.id}
                                selected={selection === company.id}
                                onClick={() => setSelection(company.id)}
                            >
                                <ListItemText primary={company.name} />
                            </ListItemButton>  
                        ))}
                    </List>
                    {pageCount > 1 && (<Pagination
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={(data) => setCurrentPage(data.selected)}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />)}
                </Crud>
            </div>        
            <div className="rightPane">
                {selection > 0 && companies.findIndex((company) => company.id === selection) >= 0 && (
                    <Job company={getSelectedItem()!} />
                )}
            </div>
        </>
    )
    
}