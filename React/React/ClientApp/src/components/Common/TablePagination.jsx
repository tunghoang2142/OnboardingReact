import React from 'react'
import { Pagination } from 'semantic-ui-react'

const TablePagination = (props) => {
    const {pageChangeHandle, totalPages, activePage} = props
    return (
        <Pagination
            activePage={activePage}
            boundaryRange={1}
            onPageChange={pageChangeHandle}
            size='mini'
            siblingRange={2}
            totalPages={totalPages}
            firstItem={false}
            lastItem={false}
            prevItem={false}
            nextItem={false}
        />)

}
export default TablePagination