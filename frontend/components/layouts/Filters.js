import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import authStore from "../../store/AuthStore";

const Filters = () => {
    const [checkVal, setCheckVal] = useState('')
    const [location, setLocation] = useState('')
    const [checked, setChecked] = useState(undefined)
    const router = useRouter();
    const { checkHandler } = authStore();
    let queryParams;
    if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search)
    };

    // const checkHandler = (e) => {
    //     console.log(e.target.value);
    //     if (queryParams.has('filter')) {
    //         queryParams.set('filter', e.target.value)

    //     } else {
    //         queryParams.append('filter', e.target.value)

    //     }

    //     router.push({
    //         search: queryParams.toString()
    //     })
    //     // e.preventDefault()
    //     // if (keyword || location) {
    //     //     let searchQuery = `/?keyword=${keyword}`;
    //     //     if (location) {
    //     //         searchQuery = searchQuery.concat(`&location=${location}`)
    //     //     }

    //     //     router.push(searchQuery)

    //     // } else {
    //     //     router.push('/')

    //     // }

    // }
    const clearFiletr = () => {

        checkHandler();


    }
    // const onCheck = (checkBoxName, checkBoxVal) => {
    //     if (typeof window !== 'undefined') {
    //         const value = queryParams.get(checkBoxName);
    //         if (value == checkBoxVal) {
    //             return true
    //         }
    //         return false
    //     }
    // }
    // const checkHandler = (checkBoxName, checkBoxVal) => {
    //     if (typeof window !== 'undefined') {
    //         const value = queryParams.get(checkBoxName);
    //         if (value == checkBoxVal) {
    //             return true
    //         }
    //         return false
    //     }

    // }
    const handleClick = (checkbox) => {
        if (typeof window !== 'undefined') {
            const checkboxes = document.getElementsByName(checkbox.name);
            setChecked(true);
            checkboxes.forEach((item) => {
                console.log(item.checked);
                if (item !== checkbox) {
                    item.checked = false
                }
            })
        }

        if (checkbox.checked == false) {

            if (queryParams.has(checkbox.name)) {
                queryParams.delete(checkbox.name)
            }

            router.replace({
                search: queryParams.toString()
            })

        } else {
            if (queryParams.has(checkbox.name)) {
                if (queryParams.has('page')) {
                    queryParams.set('page', 1)
                }

                queryParams.set(checkbox.name, checkbox.value)
            } else {
                if (queryParams.has('page')) {
                    queryParams.set('page', 1)
                }

                queryParams.append(checkbox.name, checkbox.value)
            }
            router.replace({
                search: queryParams.toString()
            })

        }
    }
    return (
        <div className="sidebar mt-5">
            <h3>Filters</h3>

            <hr />
            <h5 className="filter-heading mb-3">Job Type</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobType"
                    id="check1"
                    value="Permanent"
                    readOnly={true}
                    checked={checkHandler("jobType", "Permanent")}
                    // defaultChecked={checkHandler("jobType", "Permanent")}
                    onClick={(e) => handleClick(e.target)}
                />
                <label className="form-check-label" htmlFor="check1">
                    Permanent
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobType"
                    id="check2"
                    value="Temporary"
                    readOnly={true}
                    checked={checkHandler("jobType", "Temporary")}
                    onClick={(e) => handleClick(e.target)}

                />
                <label className="form-check-label" htmlFor="check2">
                    Temporary
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobType"
                    id="check3"
                    value="Internship"
                    defaultChecked={checkHandler("jobType", "Internship")}
                    onClick={(e) => handleClick(e.target)}

                />
                <label className="form-check-label" htmlFor="check3">
                    Internship
                </label>
            </div>

            <hr />
            <h5 className="mb-3">Education</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="education"
                    id="check4"
                    value="Bachelors"
                    defaultChecked={checkHandler("education", "Bachelors")}
                    onClick={(e) => handleClick(e.target)}

                />
                <label className="form-check-label" htmlFor="check4">
                    Bachelors
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="education"
                    id="check5"
                    value="Masters"
                    onClick={(e) => handleClick(e.target)}
                    readOnly={true}
                    checked={checkHandler("education", "Masters")}

                />
                <label className="form-check-label" htmlFor="check5">
                    Masters
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="education"
                    id="check6"
                    value="Phd"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("education", "Phd")}

                />
                <label className="form-check-label" htmlFor="check6">
                    Phd
                </label>
            </div>

            <hr />

            <h5 className="mb-3">Experience</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check7"
                    value="No Experience"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("experience", "No Experience")}

                />
                <label className="form-check-label" htmlFor="check7">
                    No Experience
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check8"
                    value="1 Year"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("experience", "1 Year")}

                />
                <label className="form-check-label" htmlFor="check8">
                    1 Year
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check9"
                    value="2 Years"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("experience", "2 Year")}

                />
                <label className="form-check-label" htmlFor="check9">
                    2 Years
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="experience"
                    id="check10"
                    value="3 Years above"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("experience", "3 Years above")}

                />
                <label className="form-check-label" htmlFor="check10">
                    3 Year+
                </label>
            </div>

            <hr />
            <h5 className="mb-3">Salary Range</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check11"
                    value="1-50000"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("salary", "1-50000")}

                />
                <label className="form-check-label" htmlFor="check11">
                    $1 - $50000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check12"
                    value="50000-100000"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("salary", "50000-100000")}

                />
                <label className="form-check-label" htmlFor="check12">
                    $50000 - $100,000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check13"
                    value="100000-200000"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("salary", "100000-200000")}

                />
                <label className="form-check-label" htmlFor="check13">
                    $100,000 - $200,000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="defaultCheck2"
                    value="200000-500000"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("salary", "200000-500000")}

                />
                <label className="form-check-label" htmlFor="defaultCheck2">
                    $200,000 - $500,000
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="salary"
                    id="check14"
                    value="500000-1000000"
                    onClick={(e) => handleClick(e.target)}
                    defaultChecked={checkHandler("salary", "500000-1000000")}

                />
                <label className="form-check-label" htmlFor="check14">
                    $500,000 - $1,000,000
                </label>
            </div>

            <hr />
            <div>
                <button
                    className="btn btn-primary"

                    name="salary"
                    id="check14"
                    onClick={() => clearFiletr()}
                >
                    Clear Filetr
                </button>

            </div>
        </div>
    );
};

export default Filters;
