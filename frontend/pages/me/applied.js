import React from 'react'
import JobsApplied from '../../components/jobs/JobsApplied'
import Layout from '../../components/layouts/Layout'
import axios from 'axios';
import isAuth from '../../utils.js/isAuth';

export default function index({ data }) {
    return (
        <Layout>
            <JobsApplied jobs={data} />
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    try {
        const token = req.cookies.access;

        const { data } = await axios.get(`${process.env.API_URL}/jobs/me/applied/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data);
        // if (!user) {
        //     return {
        //         redirect: {
        //             destination: '/login',
        //             permanent: false
        //         }
        //     }
        // }
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error);
    }
    // const user = await isAuth(token);

}