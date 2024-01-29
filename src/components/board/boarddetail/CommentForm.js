// CommentForm.jsx
import React from 'react';
import api from "../../../auth/authInterceptor";

const CommentForm = ({ comments, setComments, postComment, setPostComment, isAuthenticated }) => {
    if (!isAuthenticated) {
        return null;
    }

    const commentPost = () => {
        if (!postComment.content.trim()) {
            alert("내용을 작성해주세요.");
            return;
        }

        api.post(`/comment`, postComment)
            .then(res => {
                console.log("댓글 작성 성공", res);

                renderingAllComment(res);
                setPostComment({...postComment, content: ''});
            })
            .catch(error => {
                console.error('댓글 작성 실패', error);
                alert("일시적인 서버 에러가 발생했습니다.");
            });
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
        <form className="ms-1">
            <div className="mb-2">
        <textarea
            className="form-control"
            name="commentContent"
            rows="3"
            value={postComment.content}
            onChange={e => setPostComment({ ...postComment, content: e.target.value })}
        />
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={commentPost}>댓글 작성</button>
            </div>
        </form>
    );
};

export default CommentForm;
