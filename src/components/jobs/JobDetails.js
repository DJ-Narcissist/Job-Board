
import React from "react";
import JobCard from "./JobCard";


/** Show list of job cards as Job Details
 * USed by JobList and CompanyDetail to list jobs. 
 * 
 * Joblist-> JobCard->JobCard
 * CompanyDetail->JobDetails->JobCard
 * 
 */
const JobDetails = () => {
    console.debug("JobDetails", "jobs=", jobs);    
        return (
            <div className="JobDetails">
                {jobs.map(job =>(
                    <JobCard 
                        key={job.id}
                        id = {job.id}
                        title = {job.title}
                        salary = {job.salary}
                        equity = {job.equity}
                        companyName = {job.companyName}
                    />
                ))}
            </div>
        );
    }


export default JobDetails;