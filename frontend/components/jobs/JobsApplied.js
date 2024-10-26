import React from 'react'
import DataTable from "react-data-table-component";
export default function JobsApplied({ jobs }) {
    console.log(jobs);
    const data = [];
    const columns = [{
        name: 'Job Name',
        sortable: true,
        selector: (row) => row.title
    }];


    return (
        <div className='row'>
            <div className='col-2'></div>
            <div className='col-8 mt-5'>
                <h4 className='my-5'>Jobs Applied</h4>
                <DataTable columns={columns} data={{ name: 'world' }} />
            </div>
            <div className='col-2'></div>
        </div>
    )
}
