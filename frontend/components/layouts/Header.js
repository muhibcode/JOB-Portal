import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import authStore from "../../store/AuthStore";
import axios from "axios";
import { useRouter } from "next/router";


const Header = () => {
    const { setAuthUser, user, setUser, isLoading, setLoading, checkHandler } = authStore()

    const router = useRouter();


    // const [loading, setLoading] = useState(false)
    useEffect(() => {
        // setAuthUser(null);
        // setUser(null);
        // setLoading(true)
        if (!user) {
            // loadUser()
            console.log('renders');
            setAuthUser();
        }
    }, [])

    async function loadUser() {
        setLoading(true)

        const { data } = await axios.get('/api/auth/user');
        if (data.user) {
            setUser(data.user)

        }
        setLoading(false)


    }

    async function logout() {

        await axios.post('/api/auth/logout');

        setUser(null)

    }
    function splitMulti(str, tokens) {
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for (var i = 1; i < tokens.length; i++) {
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    }

    function goTo() {
        const value = window?.location.search;
        const key = splitMulti(value, ['?', '=', '&',]);

        // for (let index = 1; index < key.length; index++) {
        //     // const element = key[index];

        //     checkHandler(key[index % 2 != 0], key[index % 2 == 0]);

        //     console.log(key[index % 1]);

        // }

        checkHandler();


    }
    return (
        <div className="navWrapper">
            <div className="navContainer">
                <Link href={`/`}>
                    <div className="logoWrapper" onClick={goTo}>
                        <div className="logoImgWrapper">
                            <Image width="30" height="30" src="/images/logo.png" alt="" />
                        </div>
                        <span className="logo1">Kaam</span>
                        <span className="logo2">Dhanda.com</span>
                    </div>
                </Link>
                <div className="btnsWrapper">
                    <Link href="/employer/jobs/new">
                        <button className="postAJobButton">
                            <span>Post A Job</span>
                        </button>
                    </Link>
                    {user ? (<div className="dropdown ml-3">
                        <a className="btn dropdown-toggle mr-4"
                            id="dropDownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            <span>Hi, {user.first_name}</span>{" "}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                            <Link href="/employee/jobs">
                                <a className="dropdown-item">
                                    <span>My Jobs</span>
                                </a>
                            </Link>
                            <Link href="/me">
                                <a className="dropdown-item">
                                    <span>Profile</span>
                                </a>
                            </Link>
                            <Link href="/me/applied">
                                <a className="dropdown-item">
                                    <span>Jobs Applied</span>
                                </a>
                            </Link>
                            {/* <Link href="/employee/jobs">
                                <a className="dropdown-item">
                                    <span>My Jobs</span>
                                </a>
                            </Link> */}
                            <Link href="/upload/resume">
                                <a className="dropdown-item">
                                    <span>Upload Resume</span>
                                </a>
                            </Link>
                            <Link href="/">
                                <a className="dropdown-item text-danger" onClick={logout}>
                                    <span>Logout</span>
                                </a>
                            </Link>

                        </div>

                    </div>)
                        : !isLoading && (<Link href="/login">
                            <button className="loginButtonHeader">
                                <span>Login</span>
                            </button>
                        </Link>)}

                </div>
            </div>
        </div>
    );
};

export default Header;
