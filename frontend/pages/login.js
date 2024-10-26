import Link from 'next/link'
import React from 'react'
import Login from '../components/auth/Login'
import Layout from '../components/layouts/Layout'

export default function searchPage() {
    return (
        <Layout>
            <Login />
        </Layout>
    )
}
