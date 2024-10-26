import Link from 'next/link'
import React from 'react'
import Register from '../components/auth/Register'
import Layout from '../components/layouts/Layout'

export default function searchPage() {
    return (
        <Layout>
            <Register />
        </Layout>
    )
}
