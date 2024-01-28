import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";

const BoardList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    const [boards, setBoards] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    const [searchType, setSearchType] = useState('title');
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');
        const searchType = queryParams.get('searchType') || 'title';
        const searchKeyword = queryParams.get('searchKeyword') || '';
        fetchBoards(page, searchType, searchKeyword);
    }, [location.search]); // URL 쿼리 스트링 변경 시 작동

    const fetchBoards = async (page = 0, searchType = 'title', searchKeyword = '') => {
        try {
            const response = await axios.get('http://localhost:8080/api/board', {
                params: {
                    page,
                    searchType,
                    searchKeyword,
                }
            });

            console.log('게시글 목록 조회 성공', response.data.data);
            setBoards(response.data.data.boardList.content);
            setPageInfo(response.data.data.pageInfo);
            setSearchType(searchType);
            setSearchKeyword(searchKeyword);
        } catch (error) {
            console.error('게시글 목록 조회 실패', error);
        }
    };


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/board/list?searchType=${searchType}&searchKeyword=${searchKeyword}&page=1`);
    };

    const endPage = pageInfo.endPage;
    const startPage = pageInfo.startPage;
    const currentPage = pageInfo.currentPage;
    const paginationRange = Array.from({ length: (endPage - startPage) + 1 }, (_, index) => startPage + index);

    const isFirst = pageInfo.isFirst;
    const isLast = pageInfo.isLast;

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
                        <div key={board.boardId} className="custom-board-layout">
                            <div className="custom-flex-item number custom-board-font"><span>{board.boardId}</span></div>
                            <div className="custom-flex-item title custom-board-font" style={{ textAlign: 'left' }}>
                                <a href={`/board/${board.boardId}`} className="custom-title-alink">
                                    <span>{board.title}</span>
                                </a>
                                {board.commentCount > 0 && <span className="ms-2" style={{ color: '#a2a2a2' }}>({board.commentCount})</span>}
                            </div>
                            <div className="custom-flex-item author custom-board-font"><span>{board.user.username}</span></div>
                            <div className="custom-flex-item date custom-board-font"><span>{board.createdAt}</span></div>
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
                        <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
                            <a className="page-link" href={`/board/list?searchType=${searchType}&searchKeyword=${searchKeyword}&page=${currentPage - 1}`} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>

                        {paginationRange.map(pageNum => (
                            <li key={pageNum} className={`page-item ${pageNum === currentPage? 'active' : ''}`}>
                                <a className="page-link" href={`/board/list?searchType=${searchType}&searchKeyword=${searchKeyword}&page=${pageNum}`}>
                                    {pageNum}
                                </a>
                            </li>
                        ))}

                        <li className={`page-item ${isLast ? 'disabled' : ''}`}>
                            <a className="page-link" href={`/board/list?searchType=${searchType}&searchKeyword=${searchKeyword}&page=${currentPage + 1}`} aria-label="Next">
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
