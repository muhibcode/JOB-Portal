import React, { useState, useEffect } from "react";
import axios from "axios";

const TopicStats = () => {
    const [topic, setTopic] = useState('')
    const [averageSalary, setAverageSalary] = useState(0)
    const [noOfJobs, setNoOfJobs] = useState(0)
    const [minSalary, setMinSalary] = useState(0)
    const [maxSalary, setMaxSalary] = useState(0)
    if (typeof window !== 'undefined') {
        const queryParams = new URLSearchParams(window.location.search)
        if (queryParams.has('topic')) {
            queryParams.set('topic', topic)
        } else {
            queryParams.append('topic', topic)
        }
    }

    async function topicStats(topic) {
        try {
            const { data } = await axios.get(`${process.env.API_URL}/stats/${topic}`)
            const { average_salary, total_positions, min_salary, max_salary } = data.stats;
            // console.log('data is', );

            setNoOfJobs(total_positions);
            setAverageSalary(average_salary);
            setMinSalary(min_salary);
            setMaxSalary(max_salary);
        } catch (error) {
            console.log(error);

        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        topicStats(topic);
        // console.log('params are ', topic);
    }
    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h3> Get Topic Stats </h3>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-chart-line"></i>
                                    <input type="text"
                                        placeholder="Enter Your Topic"
                                        value={topic}
                                        onChange={e => setTopic(e.target.value)}
                                        required />
                                </div>
                            </div>

                            <div className="uploadButtonWrapper">
                                <button type="submit"
                                    className="uploadButton"
                                >
                                    Get Stats
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <h4>Stats of JAVA:</h4>
                        <table className="table table-striped mt-4">
                            <tbody>
                                {/* <tr>
                                    <th scope="row">Average Positions</th>
                                    <td>2</td>
                                </tr> */}
                                <tr>
                                    <th scope="row">Total Jobs</th>
                                    <td>{noOfJobs}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Minimum Salary</th>
                                    <td>{minSalary}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Maximum Salary</th>
                                    <td>{maxSalary}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Average Salary</th>
                                    <td>{averageSalary}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="alert alert-danger mt-4">
                            <b>Note:</b> These stats are collected from the jobs that are
                            posted only on Jobbee. Do not compare these stats with other
                            sites.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicStats;
