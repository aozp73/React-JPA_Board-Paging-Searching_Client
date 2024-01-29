// CommentsSection.jsx
import React from 'react';
import api from "../../../auth/authInterceptor";

const CommentsSection = ({ comments, setComments, updateComment, setUpdateComment, isAuthenticated, userId, boardId }) => {

    // 기본 상태 - 댓글 수정 Form으로 렌더링
    const startCommentUpdate = (commentId, content) => {
        setUpdateComment({...updateComment, commentId: commentId, content: content});
    };
    // 댓글 수정 Form - 취소
    const cancelCommentUpdate = () => {
        setUpdateComment({...updateComment, commentId: null, content: ''});
    };

    // 댓글 수정 Form - server 통신 및 수정
    const commentUpdate = () => {
        if (!updateComment.content.trim()) {
            alert("내용을 작성해주세요.");
            return;
        }

        api.put(`/comment/${updateComment.boardId}/${updateComment.commentId}`, updateComment)
            .then(res => {
                console.log("댓글 수정 성공", res);

                renderingAllComment(res);
                setUpdateComment({...updateComment, commentId: null, content: ''});
            })
            .catch(error => {
                console.error('댓글 수정 실패', error);
                alert("일시적인 서버 에러가 발생했습니다.");
            });
    };

    // 기본 상태 - 삭제
    const commentDelete = (commentId) => {
        const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');

        if (isConfirmed) {
            api.delete(`/comment/${boardId}/${commentId}`)
                .then(res => {
                    console.log("댓글 삭제 성공", res);

                    renderingAllComment(res);
                })
                .catch(error => {
                    console.error('게시글 삭제 실패', error);
                    alert("일시적인 서버 에러가 발생했습니다.");
                });
        } else {
            console.log('댓글 삭제 취소');
        }
    };

    const renderingAllComment = (res) => {
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

    return (
        <div className="ms-1 mt-4 mb-5">
            <div className="d-flex justify-content-end me-2 mb-2">
                <div id="countComment" style={{ fontSize: '13px' }}>댓글 {comments.length}개</div>
            </div>
            <ul className="list-group">
                {comments.map(comment => (
                    <li key={comment.commentId} className={`list-group-item ${comment.isNew ? 'new-comment' : ''}`}>
                        {updateComment.commentId === comment.commentId ? (
                            <div>
                                <input
                                    type="text"
                                    className="mt-2 form-control form-control-sm"
                                    value={updateComment.content}
                                    onChange={(e) => setUpdateComment({ ...updateComment, content: e.target.value })}
                                />
                                <div className="mt-2 d-flex justify-content-end">
                                    <span className="custom-comment-font me-2" onClick={commentUpdate}>수정하기</span>
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
                                            <span className="custom-comment-font" onClick={() => commentDelete(comment.commentId)}>삭제</span>
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
    );
};

export default CommentsSection;
