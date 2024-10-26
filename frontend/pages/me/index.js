import React from 'react'
import UpdateProfile from '../../components/user/UpdateProfile'
import Layout from '../../components/layouts/Layout'
import axios from 'axios';
import isAuth from '../../utils.js/isAuth';

export default function index({ token }) {
    return (
        <Layout>
            <UpdateProfile token={token} />
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    // console.log(req.cookies.access);
    const token = req.cookies.access;

    const user = await isAuth(token);
    // const res = await axios.post(`${process.env.API_URL}/token/verify/`, {
    //     token: token
    // });
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return {
        props: {
            token
        }
    }




}