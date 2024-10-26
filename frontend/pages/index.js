import Home from '../components/Home'
import Layout from '../components/layouts/Layout'
import axios from "axios";
import api from '../services/api'
export default function Index({ data }) {
  return (

    <Layout>

      <Home data={data} />
    </Layout>

  )
}

export async function getServerSideProps({ query }) {
  // const { keyword, location } = query
  const keyword = query.keyword || '';
  const location = query.location || '';
  const page = query.page || 1;
  const jobType = query.jobType || '';
  const education = query.education || '';
  const experience = query.experience || '';
  let min_salary = '';
  let max_salary = '';
  if (query.salary) {
    const [min, max] = query.salary.split('-');
    min_salary = min;
    max_salary = max
  }
  const queryString = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&experience=${experience}&education=${education}&min_salary=${min_salary}&max_salary=${max_salary}`;
  const { data } = await api.get(`/jobs?${queryString}`)

  // const data = res.data

  return {
    props: {
      data
    }
  }

  // try {
  //   const { data } = await api.get(`/jobs?${queryString}`)

  //   // const data = res.data

  //   return {
  //     props: {
  //       data
  //     }
  //   }
  // } catch (error) {
  //   console.log(error);
  //   // return {
  //   //   props: {
  //   //     error: error.response.data.detail
  //   //   }
  //   // }
  // }

}
