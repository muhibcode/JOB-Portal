import React from 'react'
import Layout from '../components/layouts/Layout'
import TopicStats from '../components/stats/TopicStat'

export default function statsPage() {
    return (
        <Layout>
            <TopicStats />
        </Layout>
    )
}

// export async function getServerSideProps({ req, params }) {
//     const topic = req.body;
//     console.log(topic);
//     try {
//         const { data } = await axios.get(`${process.env.API_URL}/stats/${topic}`)
//         return {
//             props: {
//                 data,

//             }
//         }
//     } catch (error) {
//         return {
//             props: {
//                 error: error.response && error.response.status
//             }
//         }
//     }


// }