import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import authStore from "../../store/AuthStore";
import Image from "next/image";

const UpdateProfile = ({ token }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, isLoading, setLoading, setUser } = authStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            // console.log(token);

        }

        // return () => {
        //     user
        // }

    }, [user])

    async function update(firstName, lastName, email, password, token) {
        try {
            setLoading(true);

            const res = await axios.put((`${process.env.API_URL}/me/update/`),
                { first_name: firstName, last_name: lastName, email, password },
                { headers: { Authorization: `Bearer ${token}` } });
            console.log(res.data);

            if (res.data) {
                setLoading(false);
                setUser(res.data)

            }

        } catch (error) {
            setLoading(false);
            console.log('error occured', error.response);

            // store.setError(error.response && (error.response.sata.detail || error.response.data.error))
        }

    }

    function handleSubmit(e) {
        e.preventDefault();

        // store.addCourse('physics');
        update(firstName, lastName, email, password, token);
        // console.log(firstName);
    }


    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <Image src="/images/profile.svg" alt="" layout="fill" />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h2>Profile</h2>
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

                                    />
                                </div>
                            </div>
                            <div className="registerButtonWrapper">
                                <button type="submit" className="registerButton">
                                    {isLoading === true ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
