import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import BoardItem from "../../components/board/boardlist/BoardItem";
import SearchForm from "../../components/board/boardlist/SearchForm";
import Pagination from "../../components/board/boardlist/Pagination";

const BoardList = () => {
    const location = useLocation();
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    const [boards, setBoards] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [searchType, setSearchType] = useState('title');
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page') || 0;
        const searchType = queryParams.get('searchType') || 'title';
        const searchKeyword = queryParams.get('searchKeyword') || '';

        fetchBoards(page, searchType, searchKeyword);
    }, [location.search]); // URL 쿼리 스트링 변경 시 작동


    const fetchBoards = async (page = 0, searchType = 'title', searchKeyword = '') => {
            axios.get('http://localhost:8080/api/board', {
                params: { page, searchType, searchKeyword,}
            }).then((response) => {
                // console.log(searchType)
                // console.log(searchKeyword)
                console.log('게시글 목록 조회 성공', response.data.data);
                setBoards(response.data.data.boardList.content);
                setPageInfo(response.data.data.pageInfo);
                setSearchType(searchType);
                setSearchKeyword(searchKeyword);
            }).catch(error => {
                console.error('게시글 목록 조회 실패', error);
                alert("일시적인 서버 오류가 발생했습니다.");
            })
    };


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
                    {boards.map(board => <BoardItem key={board.boardId} board={board} />)}
                </div>

                {/* 게시글 등록 버튼 */}
                {isAuthenticated && (
                <div className="d-flex justify-content-end mb-2">
                    <Link to="/board/saveForm" className="btn btn-secondary btn-sm me-1">글 등록</Link>
                </div>)}

                {/* 페이지네이션 */}
                <Pagination
                    isFirst={pageInfo.isFirst}
                    isLast={pageInfo.isLast}
                    currentPage={parseInt(pageInfo.currentPage, 10)}
                    startPage={pageInfo.startPage}
                    endPage={pageInfo.endPage}
                    searchType={searchType}
                    searchKeyword={searchKeyword}
                />

                {/* 검색 폼 */}
                <SearchForm
                    searchType={searchType}
                    setSearchType={setSearchType}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                />
            </div>
        </div>
    );
};

export default BoardList;
