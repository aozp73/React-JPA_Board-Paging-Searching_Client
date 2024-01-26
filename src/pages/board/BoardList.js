import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const BoardList = () => {
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    const sampleBoardData = [
        { id: 1, title: "첫 번째 게시글", username: "user1", createdAtFormat: "2022-01-01", views: 100, commentCount: 2 },
        { id: 2, title: "두 번째 게시글", username: "user2", createdAtFormat: "2022-01-02", views: 150, commentCount: 3 },
    ];

    const totalPages = 3;
    const currentPage = 1;
    const paginationRange = Array.from({ length: totalPages }, (_, i) => i + 1);

    const [searchType, setSearchType] = useState('title');
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="custom-board-list-container mb-5 mt-5">
                <div className="mb-3">
                    <div className="custom-top-layout">
                        {/* 테이블 헤더 */}
                        <div className="custom-flex-item number"><span>번호</span></div>
                        <div className="custom-flex-item title"><span>제목</span></div>
                        <div className="custom-flex-item author"><span>글쓴이</span></div>
                        <div className="custom-flex-item date"><span>작성일</span></div>
                        <div className="custom-flex-item view"><span>조회</span></div>
                    </div>

                    {/* 게시글 목록 */}
                    {sampleBoardData.map(board => (
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
