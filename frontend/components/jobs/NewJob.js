import React, { useState } from "react";
import axios from "axios";
import { jobTypeOptions, educationOtiopns, experienceOtiopns, industryOtiopns } from "./data";
const NewJob = ({ token }) => {

    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [industry, setIndustry] = useState('')
    const [jobType, setJobType] = useState('')
    const [education, setEducation] = useState('')
    const [experience, setExperience] = useState('')
    const [salary, setSalary] = useState('')
    const [positions, setPositions] = useState('')
    const [company, setCompany] = useState('')

    console.log(token);
    async function postJob() {

        const data = {
            title,
            email,
            address,
            description,
            salary,
            jobType,
            experience,
            education,
            positions,
            industry,
            company

        }
        const res = await axios.post(`${process.env.API_URL}/jobs/new/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('new job post is', token);
    }

    function submitHandler(e) {
        e.preventDefault();
        postJob();
    }
    return (
        <div className="newJobcontainer">
            <div className="formWrapper">
                <div className="headerWrapper">
                    <div className="headerLogoWrapper"></div>
                    <h1>
                        <i aria-hidden className="fas fa-copy mr-2"></i> POST A JOB
                    </h1>
                </div>
                <form className="form" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fab fa-tumblr"></i>
                                    <input type="text"
                                        placeholder="Enter Job Title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-file-medical-alt"></i>
                                    <textarea
                                        className="description"
                                        type="text"
                                        placeholder="Enter Job Description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        pattern="\S+@\S+\.\S+"
                                        title="Your email is invalid"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <input type="text"
                                        placeholder="Enter Address"
                                        onChange={e => setAddress(e.target.value)}
                                        value={address}
                                        required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-dollar-sign"></i>
                                    <input
                                        type="number"
                                        placeholder="Enter Salary Range"
                                        onChange={e => setSalary(e.target.value)}
                                        value={salary}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-users"></i>
                                    <input
                                        type="number"
                                        placeholder="Enter No. of Positions"
                                        onChange={e => setPositions(e.target.value)}
                                        value={positions}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-building"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Company Name"
                                        onChange={e => setCompany(e.target.value)}
                                        value={company}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
                            <div className="boxWrapper">
                                <h4>Job Types:</h4>

                                <div className="selectWrapper">
                                    <select className="classic"
                                        value={jobType}
                                        onChange={e => setJobType(e.target.value)} >
                                        {jobTypeOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Education:</h4>
                                <div className="selectWrapper">
                                    <select className="classic"
                                        value={education}
                                        onChange={e => setEducation(e.target.value)} >
                                        {educationOtiopns.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Industry:</h4>
                                <div className="selectWrapper">
                                    <select className="classic"
                                        value={industry}
                                        onChange={e => setIndustry(e.target.value)} >
                                        {industryOtiopns.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Experience:</h4>
                                <div className="selectWrapper">
                                    <select className="classic"
                                        value={experience}
                                        onChange={e => setExperience(e.target.value)} >
                                        {experienceOtiopns.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col text-center mt-3">
                            <button className="createButton">Create Job</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewJob;
