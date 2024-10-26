import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = () => {
    const [keyword, setKeyword] = useState('')
    const [location, setLocation] = useState('')
    const router = useRouter()

    const submitHandler = (e) => {
        e.preventDefault()


        if (keyword || location) {
            let searchQuery = `/?keyword=${keyword}`;
            if (location) {
                searchQuery = searchQuery.concat(`&location=${location}`)
            }

            router.push(searchQuery)

        } else {
            router.push('/')

        }

    }
    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <img src="/images/job-search.svg" alt="search" />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h2> SEARCH</h2>
                        </div>
                        <form className="form">
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-search"></i>
                                    <input
                                        value={keyword}
                                        type="text"
                                        placeholder="Enter Your Keyword"
                                        onChange={(e) => setKeyword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-industry"></i>
                                    <input
                                        value={location}
                                        type="text"
                                        placeholder="Enter City, State ..."
                                        onChange={(e) => setLocation(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className="searchButtonWrapper">
                                <button type="submit" className="searchButton" onClick={submitHandler}>
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;

