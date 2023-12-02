import React, { useState } from "react";
import "./SearchForm.css";

/**Search Widget
 * Renders the search form and calls the 'searchFor' function prop that runs
 * in a parent to do the searching
 * {CompanyList,JobList} -> SearchForm
 */
const SearchForm = ({searchFor}) => {
    console.debug("SearchForm", "searchFor=", typeof searchFor);
    const [ searchTerm, setSearchTerm] = useState("");

    /**Tell parent to filter */
    const handleSubmit= (e) => { 
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    /** Update form fields */
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter here"
                    value={searchTerm}
                    onChange={handleChange}    
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SearchForm;


