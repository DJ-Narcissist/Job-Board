import React, { useEffect, useState } from "react";
import { search } from "../../../../backend/routes/jobs";
import JoblyApi from "../../api";
import LoadingCursor from "../Misc/LoadingCursor";
import SearchForm from "../Misc/SearchForm";


/** Show page with list of companies.
 * 
 * On mount, laods companies from API 
 * Reloads filtered companies on submit from search form
 *  @ /companies
 * Rooutes -> {CompanyCard, SearchForm}
 */
const CompanyList = () => {
    console.debug("CompanyList");
    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
    }, []);

    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
        let companies = await JoblyApi.getAllCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingCursor/>;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
          <SearchForm searchFor={search} />
          {companies.length
              ? (
                  <div className="CompanyList-list">
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            logoUrl={c.logoUrl}
                        />
                    ))}
                  </div>
              ) : (
                  <p className="lead">Sorry, no results were found!</p>
              )}
        </div>
    );
}

export default CompanyList;