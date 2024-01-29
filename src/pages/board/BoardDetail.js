import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {store} from "../../auth/store";
import api from "../../auth/authInterceptor";
import apiOptional from "../../auth/authOptionalInterceptor";

const BoardDetail = () => {
    const {boardId} = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState({});
    const [comments, setComments] = useState([]);
    const [postComment, setPostComment] = useState({boardId: boardId, content: ''});

    const [updateComment, setUpdateComment] = useState({boardId: null, commentId:null, content:''});

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

         apiOptional.get(`/board/${id}`, {headers})
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

    const handleCommentPost = () => {
        if (!postComment.content.trim()) {
            alert("내용을 작성해주세요.");
            return;
        }

        api.post(`/comment`, postComment)
            .then(res => {
                console.log("댓글 작성 성공", res);

                rederingAllComment(res);
                setPostComment({...postComment, content: ''});
            })
            .catch(error => {
                console.error('댓글 작성 실패', error);
                alert("일시적인 서버 에러가 발생했습니다.");
            });
    };

    const startCommentUpdate = (commentId, content) => {
        setUpdateComment({...updateComment, boardId:boardId ,commentId: commentId, content: content});
    };
    const cancelCommentUpdate = () => {
        setUpdateComment({...updateComment, commentId: null, content: ''});
    };

    const commentUpdate = () => {
        console.log(updateComment)

        api.put(`/comment/` + updateComment.boardId+ '/' + updateComment.commentId, updateComment)
            .then(res => {
                console.log("댓글 수정 성공", res);

                rederingAllComment(res);
                setUpdateComment({...updateComment, commentId: null, content: ''});
            })
            .catch(error => {
                console.error('댓글 수정 실패', error);
                alert("일시적인 서버 에러가 발생했습니다.");
            });
    };

    const rederingAllComment = (res) => {
        /**
         * 응답 데이터: 추가한 댓글 뿐 아니라, DB의 해당 게시글 전체 댓글
         * - 목 적: 댓글 작성 중 추가 작성된 댓글들 로드
         * - 추가 기능: 새로 작성된 댓글들 플래시 효과
         */
        const newComments = res.data.data;
        const existingCommentIds = comments.map(comment => comment.commentId);
        const updatedComments = newComments.map(comment => ({
            ...comment,
            isNew: !existingCommentIds.includes(comment.commentId)
        }));
        setComments(updatedComments);
    }

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
                            <li key={comment.commentId} className={`list-group-item ${comment.isNew ? 'new-comment' : ''}`}>
                                {updateComment.commentId === comment.commentId ? (
                                    // 댓글 수정 양식
                                    <div>
                                        <input
                                            type="text"
                                            className="mt-2 form-control form-control-sm"
                                            value={updateComment.content}
                                            onChange={(e) => setUpdateComment({...updateComment, content: e.target.value})}
                                        />
                                        <div className="mt-2 d-flex justify-content-end">
                                            <span className="custom-comment-font me-2" onClick={() => commentUpdate()}>수정하기</span>
                                            <span className="custom-comment-font" onClick={cancelCommentUpdate}>취소</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-2 d-flex justify-content-between">
                                            <div>
                                                <span className="me-3">{comment.user?.username}</span>
                                                <span className="custom-comment-font">{comment.createdAt}</span>
                                            </div>
                                            {isAuthenticated && userId === comment.user?.userId && comment?.editable && (
                                                <div>
                                                    <span className="custom-comment-font" onClick={() => startCommentUpdate(comment.commentId, comment.content)}>수정</span>
                                                    <span className="custom-comment-font" onClick={handleCommentDelete}>삭제</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px' }}>{comment.content}</div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {isAuthenticated && (
                    <form className="ms-1">
                        <div className="mb-2">
                            <textarea className="form-control" name="commentContent" rows="3" value={postComment.content}
                            onChange={e => {setPostComment({...postComment, content: e.target.value})}} />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-primary" onClick={handleCommentPost}>댓글 작성</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BoardDetail;
