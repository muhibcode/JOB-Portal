import Head from 'next/head'
import React, { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import Script from 'next/script'
import authStore from "../../store/AuthStore";

export default function Layout({ children, title = 'jobs-site' }) {
    const { user, setLoading } = authStore();

    return (
        <div>
            <Head>
                <title>{title}</title>

            </Head>
            <Script
                strategy="beforeInteractive"
                src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            ></Script>

            <Script
                src="https://kit.fontawesome.com/9edb65c86a.js"
                crossOrigin="anonymous"
            ></Script>

            <Script
                strategy="beforeInteractive"
                src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            ></Script>

            <Script
                strategy="beforeInteractive"
                src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
            ></Script>
            <Header />
            {children}
            <Footer />
        </div>


    )
}
