import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import authStore from "../../store/AuthStore";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, isAuthenticated, error, setLoading, setIsAuthenticated, setAuthUser } = authStore()

    const router = useRouter()
    // useEffect(() => {

    //     // if (error) {
    //     //     console.log(error)
    //     // }
    //     // if (isAuthenticated && !isLoading) {
    //     //     router.push('/')
    //     // }

    // }, [])

    async function login(email, password) {
        // setLoading(true);
        const { data } = await axios.post('/api/auth/login', {
            username: email, password
        })

        // console.log(data);

        if (data.success) {
            setLoading(false);
            setIsAuthenticated(true);
            router.replace('/');
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        login(email, password);
    }
    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <Image src="/images/login.svg" alt="login" layout="fill" />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h2> LOGIN</h2>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input type="email"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}

                                        required
                                    />
                                </div>
                            </div>
                            <div className="loginButtonWrapper">
                                <button type="submit" className="loginButton">
                                    {isLoading === true ? 'Authenticating...' : 'Login'}
                                </button>
                            </div>
                            <p style={{ textDecoration: "none" }} className="signup">
                                New to Jobbee? <Link href="/register">Create an account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
