import Link from "next/link";
import React from "react";
import moment from 'moment'

const JobItem = ({ job }) => {
    const { id, title, company, description, industry, salary, jobType, createdAt } = job
    // console.log(data);
    return (
        <Link href={`/job/${id}`}>
            <a className="job-listing" target={'_blank'}>
                <div className="job-listing-details">
                    <div className="job-listing-description">
                        <h4 className="job-listing-company">{company}</h4>
                        <h3 className="job-listing-title">{title} required</h3>
                        <p className="job-listing-text">
                            {description.substring(0, 200)}...
                        </p>
                    </div>

                    <span className="bookmark-icon"></span>
                </div>

                <div className="job-listing-footer">
                    <ul>
                        <li>
                            <i aria-hidden className="fas fa-industry"></i> {industry}
                        </li>

                        <li>
                            <i aria-hidden className="fas fa-briefcase"></i> {jobType}
                        </li>
                        <li>
                            <i aria-hidden className="fas fa-money-check-alt"></i>${salary}
                        </li>
                        <li>
                            <i aria-hidden className="far fa-clock"></i>Posted {moment.utc(createdAt).local().startOf('seconds').fromNow()}
                        </li>
                    </ul>
                </div>
            </a>
        </Link>
    );
};

export default JobItem;
