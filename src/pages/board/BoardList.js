import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";

const BoardList = () => {
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    const [boards, setBoards] = useState([]);
    const [pageInfo, setPageInfo] = useState({}); // For pagination info

    const [searchType, setSearchType] = useState('title');
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            axios.get('http://localhost:8080/api/board', {
                params: {
                    searchType,
                    searchKeyword,
                }
            })
                .then(res => {
                    console.log('게시글 목록 조회 성공', res.data.data);
                    setBoards(res.data.data.boardList.content);
                    setPageInfo(res.data.data.pageInfo);
                });

        } catch (error) {
            console.error('게시글 목록 조회 실패', error);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchBoards();
    };

    const totalPages = pageInfo.totalPages || 0;
    const currentPage = pageInfo.currentPage || 1;
    const paginationRange = Array.from({ length: totalPages }, (_, i) => i + 1);


    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="custom-board-list-container mb-5 mt-5">
                <div className="mb-3">
                    <div className="custom-top-layout">
                        <div className="custom-flex-item number"><span>번호</span></div>
                        <div className="custom-flex-item title"><span>제목</span></div>
                        <div className="custom-flex-item author"><span>글쓴이</span></div>
                        <div className="custom-flex-item date"><span>작성일</span></div>
                        <div className="custom-flex-item view"><span>조회</span></div>
                    </div>

                    {/* 게시글 목록 */}
                    {boards.map(board => (
                        <div key={board.id} className="custom-board-layout">
                            <div className="custom-flex-item number custom-board-font"><span>{board.id}</span></div>
                            <div className="custom-flex-item title custom-board-font" style={{ textAlign: 'left' }}>
                                <a href={`/board/${board.id}`} className="custom-title-alink">
                                    <span>{board.title}</span>
                                </a>
                                {board.commentCount > 0 && <span className="ms-2" style={{ color: '#a2a2a2' }}>({board.commentCount})</span>}
                            </div>
                            <div className="custom-flex-item author custom-board-font"><span>{board.username}</span></div>
                            <div className="custom-flex-item date custom-board-font"><span>{board.createdAtFormat}</span></div>
                            <div className="custom-flex-item view custom-board-font"><span>{board.views}</span></div>
                        </div>
                    ))}
                </div>

                {/* 글 등록 버튼 */}
                {isAuthenticated && (
                <div className="d-flex justify-content-end mb-2">
                    <Link to="/board/saveForm" className="btn btn-secondary btn-sm me-1">글 등록</Link>
                </div>)}

                {/* 페이지네이션 */}
                <div className="d-flex justify-content-center">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" href={`/board?page=${currentPage - 1}`} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>

                        {paginationRange.map(pageNum => (
                            <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
                                <a className="page-link" href={`/board?page=${pageNum}`}>
                                    {pageNum}
                                </a>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" href={`/board?page=${currentPage + 1}`} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* 검색 폼 */}
                <div className="d-flex justify-content-center">
                    <div>
                        <form onSubmit={handleSearchSubmit}>
                            <div className="input-group">
                                <select className="form-select me-2" value={searchType} onChange={e => setSearchType(e.target.value)}>
                                    <option value="title">제목</option>
                                    <option value="author">작성자</option>
                                </select>
                                <div className="me-2">
                                    <input type="text" className="form-control" style={{ width: '270px' }}
                                           placeholder="검색어를 입력하세요" value={searchKeyword}
                                           onChange={e => setSearchKeyword(e.target.value)} />
                                </div>

                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-secondary">검색</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardList;
