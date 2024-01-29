import React from 'react';
import { Link } from "react-router-dom";

const BoardListItem = ({ board }) => {
    return (
            <div className="custom-board-layout">
                <div className="custom-flex-item number custom-board-font"><span>{board.boardId}</span></div>
                <div className="custom-flex-item title custom-board-font" style={{ textAlign: 'left' }}>
                    <Link to={`/board/${board.boardId}`} className="custom-title-alink">
                        <span>{board.title}</span>
                    </Link>
                    {board.commentCount > 0 && <span className="ms-2" style={{ color: '#a2a2a2' }}>({board.commentCount})</span>}
                </div>
                <div className="custom-flex-item author custom-board-font"><span>{board.user.username}</span></div>
                <div className="custom-flex-item date custom-board-font"><span>{board.createdAt}</span></div>
                <div className="custom-flex-item view custom-board-font"><span>{board.views}</span></div>
            </div>

    );
};

export default BoardListItem;
