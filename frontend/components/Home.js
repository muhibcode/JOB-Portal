import Link from "next/link";
import React, { useEffect } from "react";
import Filters from "./layouts/Filters";
import JobItem from "./jobs/JobItem";
import Pagination from 'react-js-pagination'
import { useRouter } from "next/router";
const Home = ({ data }) => {

    const { jobs, count, resPerPage } = data
    const router = useRouter()


    let { page = 1, keyword } = router.query
    page = Number(page)
    let queryParams;
    if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search)
    };

    const handlePageChange = (currentPage) => {
        console.log(router.query);

        if (queryParams.has('page')) {
            queryParams.set('page', currentPage)

        } else {
            queryParams.append('page', currentPage)

        }

        router.push({
            search: queryParams.toString()
        })
    };
    return (


        <div className="container container-fluid">
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <Filters />
                </div>

                <div className="col-xl-9 col-lg-8 content-left-offset">
                    <div className="my-5">
                        <h4 className="page-title">"Latest Jobs"</h4>
                        <Link href="/stats">
                            <button className="btn btn-secondary float-right stats_btn">
                                Get Topic stats
                            </button>
                        </Link>
                        <div className="d-block">
                            <Link href="/search">Go to Search</Link>
                        </div>
                    </div>
                    {jobs.map((job => <JobItem key={job.id} job={job} />
                    ))}

                    {resPerPage < count &&
                        <Pagination
                            activePage={page}
                            nextPageText={'Next'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            prevPageText={'Previous'}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={count}
                            onChange={handlePageChange}
                            itemClass='page-item'
                            linkClass="page-link" />}

                </div>
            </div>
        </div>

    );
};

export default Home;
