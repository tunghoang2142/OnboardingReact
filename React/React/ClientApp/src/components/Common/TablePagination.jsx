import React from 'react'
import { Pagination } from 'semantic-ui-react'

const TablePagination = (pageChangeHandle) => {
    return (
        <Pagination
            activePage={1}
            boundaryRange={1}
            onPageChange={pageChangeHandle}
            size='mini'
            siblingRange={2}
            totalPages={50}
            firstItem={false}
            lastItem={false}
            prevItem={false}
            nextItem={false}
        />)

}
export default TablePagination