import React from 'react'
import NewJob from '../../../components/jobs/NewJob'
import Layout from '../../../components/layouts/Layout'
import axios from 'axios';
import isAuth from '../../../utils.js/isAuth';

export default function index({ token }) {
    return (
        <Layout>
            <NewJob token={token} />
        </Layout>
    )
}

export function getServerSideProps({ req }) {
    try {
        const token = req.cookies.access;

        const user = isAuth(token);
        // console.log(data);
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
    } catch (error) {
        console.log(error);
    }
    // const user = await isAuth(token);

}