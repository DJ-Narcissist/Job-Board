import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import LoadingCursor from "../Misc/LoadingCursor";


/** Company  Detail page.
 * 
 * Renders info about company, along with the jobs at that company.
 * 
 * Routed at /companies/:handle
 * 
 * Routes -> CompanyDetail -> JobCatdList
 */
const CompanyDetails = () => {
    const { handle } = useParams();
    console.debug("CompanyDetail", "handle=", handle);

    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobsForUser() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany();
    }, [handle]);

    if (!company) return <LoadingCursor />;

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4> {company.name}</h4>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    );
}

export default CompanyDetails;



