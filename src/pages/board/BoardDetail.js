import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {store} from "../../auth/store";
import api from "../../auth/authInterceptor";

const BoardDetail = () => {
    const {boardId} = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState({});
    const [comments, setComments] = useState([]);

    const auth = useSelector((state) => state.auth);
    const { isAuthenticated, userId } = auth;

    useEffect(() => {
        fetchBoardDetail(boardId);
    }, [boardId]);

    const fetchBoardDetail = async (id) => {
        const accessToken = store.getState().auth.accessToken;
        const headers = {};

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

         axios.get(`http://localhost:8080/api/board/${id}`, {headers})
             .then( res => {
                 console.log("게시글 상세 조회 성공", res);

                 setBoard(res.data.data.boardDetailDTO);
                 setComments(res.data.data.commentListDTOS);

             }).catch(error => {
                 console.error('게시글 상세 조회 실패', error);

                 alert("일시적인 서버 에러가 발생했습니다.");
         });
    };

    const handleBoardDelete = () => {
        const isConfirmed = window.confirm('게시글을 삭제하시겠습니까?');

        if (isConfirmed) {
            api.delete(`/board/${boardId}`)
                .then(res => {
                    console.log("게시글 삭제 성공", res);
                    navigate(`/board/list`)
                })
                .catch(error => {
                    console.error('게시글 삭제 실패', error);
                    alert("일시적인 서버 에러가 발생했습니다.");
                });
        } else {
            console.log('게시글 삭제 취소');
        }
    };

    const handleCommentUpdate = () => {
    };

    const handleCommentDelete = () => {
    };

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="custom-board-detail-container mb-5 mt-5">
                <div className="mb-2 d-flex justify-content-between align-items-center custom-board-detail-title">
                    <div className="ms-1" style={{ fontSize: '18px' }}>{board.title}</div>
                    <div style={{ color: 'rgb(128,128,128)' }}>{board.createdAt}</div>
                </div>
                <div className="d-flex justify-content-between align-items-center ms-1">
                    <div>
                        <span className="ms-3 me-3" style={{ color: 'rgb(128,128,128)' }}>{board.user?.username}</span>
                    </div>
                    <div className="me-2">
                        <span className="me-1" style={{ color: 'rgb(128,128,128)' }}>조회수:  {board.views}</span>
                    </div>
                </div>

                <hr />
                {isAuthenticated && userId === board.user?.userId && board.editable && (
                    <div className="d-flex justify-content-end mb-2">
                        <Link to={`/board/updateForm/${boardId}`} className="btn btn-secondary btn-sm me-1">
                            수정
                        </Link>
                        <button className="btn btn-secondary btn-sm" onClick={handleBoardDelete}>
                            삭제
                        </button>
                    </div>
                )}

                {/* 게시글 내용 */}
                <div className="ms-2 py-3">{board.content}</div>
                <hr />

                {/* 댓글 섹션 */}
                <div className="ms-1 mt-4 mb-5">
                    <div className="d-flex justify-content-end me-2 mb-2">
                        <div id="countComment" style={{ fontSize: '13px' }}>댓글 {board.commentCount}개</div>
                    </div>
                    <ul className="list-group">
                        {comments.map(comment => (
                            <li key={comment.id} className="list-group-item">
                                <div className="mb-2 d-flex justify-content-between">
                                    <div>
                                        <span className="me-3">{comment.user.username}</span>
                                        <span className="custom-comment-font">{comment.createdAt}</span>
                                    </div>
                                    {isAuthenticated && userId === comment.user.userId && comment?.editable && (
                                        <div>
                                            <span className="custom-comment-font" onClick={handleCommentUpdate}>수정</span>
                                            <span className="custom-comment-font" onClick={handleCommentDelete}>삭제</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px' }}>{comment.content}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {isAuthenticated && (
                    <form className="ms-1">
                        <div className="mb-2">
                            <textarea className="form-control" id="commentContent" name="commentContent" rows="3"></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary">댓글 작성</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BoardDetail;
