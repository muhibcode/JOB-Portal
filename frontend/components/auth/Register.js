import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import authStore from "../../store/AuthStore";
import Image from "next/image";

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const store = authStore();
    const router = useRouter();

    async function register(firstName, lastName, email, password) {
        try {
            store.setLoading(true);

            const res = await axios.post((`${process.env.API_URL}/register/`),
                { first_name: firstName, last_name: lastName, email, password });
            // console.log(res.data);

            if (res.data.message) {
                store.setLoading(false);
                router.push('/login');
            }

        } catch (error) {
            store.setLoading(false);
            console.log('error occured', error.response);

            // store.setError(error.response && (error.response.sata.detail || error.response.data.error))
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        // store.addCourse('physics');
        register(firstName, lastName, email, password);
        console.log(firstName);
    }


    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <Image src="/images/signup.svg" alt="register" layout="fill" />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h2> SIGN UP</h2>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user"></i>
                                    <input type="text"
                                        placeholder="Enter First Name"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        required />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user-tie"></i>
                                    <input type="text"
                                        placeholder="Enter Last name"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        required />
                                </div>

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
                            <div className="registerButtonWrapper">
                                <button type="submit" className="registerButton">
                                    {store.isLoading === true ? 'Loading...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
