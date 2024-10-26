import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import authStore from "../../store/AuthStore";

const JobDetail = ({ data, token }) => {
    const { job, candidates } = data
    const { id, title, address, salary, company, education, createdAt,
        email, industry, experience, description, jobType, lastDate } = job
    // console.log(token);
    const { user, isLoading, setApplied, isAuthenticated, setIsAuthenticated, setLoading, applied,
        setAuthUser } = authStore()
    const [candidate, setCandidate] = useState(0);
    const [error, setError] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [applied, setApplied] = useState(false);
    const router = useRouter()
    useEffect(() => {
        // setLoading(true);
        if (user) {
            checkApplied(id, token);
        }
        console.log('suer');
        setCandidate(candidates);

    }, [user])

    async function applyToJob(id, token) {
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.API_URL}/jobs/${id}/apply/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (data.applied == true) {
                setLoading(false);
                setApplied(true);
            }
            setCandidate(candidate + 1);

        } catch (error) {
            // console.log(error);
            if (error.response.status === 401) {
                // setError('need to loggin first');
                router.replace('/login');
            }
        }
    }
    async function checkApplied(id, token) {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.API_URL}/jobs/${id}/check/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setApplied(data.applied);
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    function handleClick() {
        applyToJob(id, token);
    }
    const d1 = moment(lastDate);
    const d2 = moment(Date.now())
    const isLastDatePassed = d1.diff(d2, 'days') < 0 ? true : false;

    return (

        <div className="job-details-wrapper">
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <div className="job-details p-3">
                            <div className="job-header p-4">
                                <h2>{title} Required</h2>
                                <span>
                                    <i aria-hidden className="fas fa-building"></i>
                                    <span> {industry}</span>
                                </span>
                                <span className="ml-4">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <span> {address}</span>
                                </span>

                                <div className="mt-3">
                                    <span>
                                        {isLoading ? '' : applied ?
                                            <button disabled className="btn btn-success px-4 py-2 apply-btn">
                                                <i aria-hidden className="fas fa-check" />
                                                {' Applied'}
                                            </button>
                                            : isLastDatePassed ?
                                                <button disabled className="btn btn-primary px-4 py-2 apply-btn"
                                                >
                                                    {'Apply Now'}
                                                </button>
                                                : isLoading ? '' :
                                                    <button className="btn btn-primary px-4 py-2 apply-btn"
                                                        onClick={handleClick}>
                                                        {'Apply Now'}
                                                    </button>}
                                        <span className="ml-4 text-success">
                                            <b>{candidate}</b> candidates has applied to this job.
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className="job-description mt-5">
                                <h4>Description</h4>
                                <p>
                                    {description}
                                </p>
                            </div>

                            <div className="job-summary">
                                <h4 className="mt-5 mb-4">Job Summary</h4>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Job Type</td>
                                            <td>:</td>
                                            <td>{jobType}</td>
                                        </tr>

                                        <tr>
                                            <td>Job Industry</td>
                                            <td>:</td>
                                            <td>{industry}</td>
                                        </tr>

                                        <tr>
                                            <td>Expected Salary</td>
                                            <td>:</td>
                                            <td>${salary}</td>
                                        </tr>

                                        <tr>
                                            <td>Education</td>
                                            <td>:</td>
                                            <td>{education}</td>
                                        </tr>

                                        <tr>
                                            <td>Experience</td>
                                            <td>:</td>
                                            <td>{experience}</td>
                                        </tr>

                                        <tr>
                                            <td>Company</td>
                                            <td>:</td>
                                            <td>{company}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="job-location">
                                <h4 className="mt-5 mb-4">{address}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4">
                        <div className="job-contact-details p-3">
                            <h4 className="my-4">More Details</h4>
                            <hr />
                            <h5>Email Address:</h5>
                            <p>{email}</p>

                            <h5>Job Posted:</h5>
                            <p>{moment.utc(createdAt).local().startOf('seconds').fromNow()}</p>

                            <h5>Last Date:</h5>
                            <p>{lastDate.substring(0, 10)}</p>
                        </div>
                        {isLoading ? '' : isLastDatePassed && !applied &&
                            <div className="mt-5 p-0">
                                <div className="alert alert-danger">
                                    <h5>Note:</h5>
                                    You can no longer apply to this job. This job is expired. Last
                                    date to apply for this job was: <b>{lastDate.substring(0, 10)}</b>
                                    <br /> Checkout others job on Jobbee.
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
