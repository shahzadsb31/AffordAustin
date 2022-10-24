import { Pagination } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import './Pagination.css'

// Looked at code from adoptapet group
const Paginate = ({totalInstances, pageLimit, paginate, page}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalInstances / pageLimit);
    
    const changePage = (newPage) => {
        if (newPage <= totalPages && newPage > 0) {
            setCurrentPage(newPage);
            paginate(newPage);
        }    
    }

    useEffect(() => {
        page = parseInt(page);
        setCurrentPage(page);
    }, [page]);

    return (
        <div className="pagination">
            <Pagination>
                <Pagination.Prev onClick={() => changePage(currentPage - 1)}/>
                {currentPage > 3 &&
                    <Pagination.Item onClick={() => changePage(1)}>1</Pagination.Item>
                }
                {currentPage > 3 && 
                    <Pagination.Ellipsis></Pagination.Ellipsis>
                }
                {currentPage > 2 && 
                    <Pagination.Item onClick={() => changePage(currentPage - 2)}>{currentPage - 2}</Pagination.Item>
                }
                {currentPage > 1 && 
                    <Pagination.Item onClick={() => changePage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
                }
                <Pagination.Item active>{currentPage}</Pagination.Item>
                {currentPage < totalPages && 
                    <Pagination.Item onClick={() => changePage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
                }
                {currentPage < totalPages - 1 && 
                    <Pagination.Item onClick={() => changePage(currentPage + 2)}>{currentPage + 2}</Pagination.Item>
                }
                {currentPage < totalPages - 2 && 
                    <Pagination.Ellipsis></Pagination.Ellipsis>
                }
                {currentPage < totalPages - 2 &&
                    <Pagination.Item onClick={() => changePage(totalPages)}>{totalPages}</Pagination.Item>
                }
                <Pagination.Next onClick={() => changePage(currentPage + 1)} />
            </Pagination>
        </div>
    );
};

Paginate.propTypes = {
    totalInstances: PropTypes.number.isRequired,
    pageLimit: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired
};

export default Paginate;