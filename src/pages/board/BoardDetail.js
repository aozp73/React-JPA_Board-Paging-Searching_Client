import React from 'react';
import {useSelector} from "react-redux";

const BoardDetail = () => {
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    const boardData = {
        id: 1,
        title: "게시글 제목",
        username: "작성자",
        createdAtFormat: "2022-01-01 07:31:22",
        views: 100,
        content: "게시글 내용",
        commentCount: 2,
        commentDTO: [
            { id: 1, username: "댓글 작성자1", createdAtFormat: "2022-01-02 12:34:56", content: "댓글 내용1" },
            { id: 2, username: "댓글 작성자2", createdAtFormat: "2022-01-03 11:13:42", content: "댓글 내용2" },
        ],
    };

    const handleBoardUpdate = () => {
    };

    const handleBoardDelete = () => {
    };

    const handleCommentUpdate = () => {
    };

    const handleCommentDelete = () => {
    };

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="custom-board-detail-container mb-5 mt-5">
                <div className="mb-2 d-flex justify-content-between align-items-center custom-board-detail-title">
                    <div className="ms-1" style={{ fontSize: '18px' }}>{boardData.title}</div>
                    <div style={{ color: 'rgb(128,128,128)' }}>{boardData.createdAtFormat}</div>
                </div>
                <div className="d-flex justify-content-between align-items-center ms-1">
                    <div>
                        <span className="ms-3 me-3" style={{ color: 'rgb(128,128,128)' }}>{boardData.username}</span>
                    </div>
                    <div className="me-2">
                        <span className="me-1" style={{ color: 'rgb(128,128,128)' }}>조회수:  {boardData.views}</span>
                    </div>
                </div>

                <hr />
                {isAuthenticated && (
                    <div className="d-flex justify-content-end mb-2">
                        <button className="btn btn-secondary btn-sm me-1" onClick={handleBoardUpdate}>수정
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleBoardDelete}>삭제
                        </button>
                    </div>
                )}

                {/* 게시글 내용 */}
                <div className="ms-2 py-3">{boardData.content}</div>
                <hr />

                {/* 댓글 섹션 */}
                <div className="ms-1 mt-4 mb-5">
                    <div className="d-flex justify-content-end me-2 mb-2">
                        <div id="countComment" style={{ fontSize: '13px' }}>댓글 {boardData.commentCount}개</div>
                    </div>
                    <ul className="list-group">
                        {boardData.commentDTO.map(comment => (
                            <li key={comment.id} className="list-group-item">
                                <div className="mb-2 d-flex justify-content-between">
                                    <div>
                                        <span className="me-3">{comment.username}</span>
                                        <span className="custom-comment-font">{comment.createdAtFormat}</span>
                                    </div>
                                    {isAuthenticated && (
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
