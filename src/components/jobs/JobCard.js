import React, { useContext, useState } from "react";
import "./JobCard.css";

const JobCard = (id, title, salary, CompanyName,location) => {


    const {hasApplied, applyToJob} = useContext(useContext);
    const [applied, setApplied] = useState();

    React.useEffect(hasApplied = () => {

        setApplied(hasApplied(id));
    }, [id, hasApplied]);

    async function handleApply(e) {
        if (hasApplied(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="JobCard card"> {applied} 
            <div className="card-body">
                <h7 className= "card-title">{title}</h7>
                <p>{CompanyName}</p>
            </div>
            {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
            {location && <div><small> Location {location}</small></div>}
        </div> 
    )
}

export default JobCard;