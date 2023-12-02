import React, { useEffect, useState } from "react";
import JoblyApi from "../../api";
import LoadingCursor from "../Misc/LoadingCursor";
import SearchForm from "../Misc/SearchForm";
import JobDetails from "./JobDetails";

/** Show page with list of jobs.
 * 
 * On Mount, loads jobs form API.
 * Re-Loads filtered jobs on submit from search form.
 * 
 * This is routed at /jobs
 * Routes -> { JobCard, SearchForm }
 */

const JobList = () => {
    console.debug("JobList");
    const [ jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        console.debug("JobList useEffect getAllJobsOnMount");
        search();
    }, []);

    /** Triggered by search form submit; reloads jobs. */
    async function search(name) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if(!jobs) return <LoadingCursor/>;

    return (
            <div className="JobList col-md-8 offset-md-2">
              <SearchForm searchFor={search} />
              {jobs.length
                  ?  <JobDetails jobs= {jobs} /> 
                : <p className="lead">Sorry, no results were found!</p>
                }
        </div>
    );
}

export default JobList;