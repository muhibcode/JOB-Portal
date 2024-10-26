import Layout from '../../components/layouts/Layout'
import axios from "axios";
import JobDetail from '../../components/jobs/JobDetail';
import NotFound from '../../components/layouts/NotFound';
import api from '../../services/api';
export default function JobDetailsPage({ data, error, token }) {
    // console.log(data, error);
    return (
        <Layout>
            {error === 404 ?
                <NotFound /> :
                <JobDetail data={data} token={token} />}
        </Layout>

    )
}

export async function getServerSideProps({ req, params }) {
    const token = req.cookies.access || '';
    console.log(token);
    try {
        const { data } = await axios.get(`${process.env.API_URL}/job/${params.id}`)
        return {
            props: {
                data,
                token
            }
        }
    } catch (error) {
        return {
            props: {
                error: error.response && error.response.status
            }
        }
    }


}