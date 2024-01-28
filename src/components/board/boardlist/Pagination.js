import React from 'react';
import {useNavigate} from "react-router-dom";

const Pagination = ({ isFirst, isLast, currentPage, startPage, endPage, searchType, searchKeyword}) => {

    const navigate = useNavigate();
    const paginationRange = Array.from({ length: (endPage - startPage) + 1 }, (_, index) => startPage + index);

    const onNavigate = (pageNum) => navigate(`/board/list?searchType=${searchType}&searchKeyword=${searchKeyword}&page=${pageNum}`);

    return (
        <div className="d-flex justify-content-center">
            <ul className="pagination">
                <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onNavigate(currentPage - 1)}>&laquo;</button>
                </li>
                {paginationRange.map(pageNum => (
                    <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onNavigate(pageNum)}>{pageNum}</button>
                    </li>
                ))}
                <li className={`page-item ${isLast ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onNavigate(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
