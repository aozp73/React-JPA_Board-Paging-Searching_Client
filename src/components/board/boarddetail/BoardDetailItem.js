import {Link, useNavigate} from "react-router-dom";
import api from "../../../auth/authInterceptor";

const BoardDetailItem = ({ board, boardId, isAuthenticated, userId }) => {

    const navigate = useNavigate();

    const boardDelete = () => {
        console.log(boardId)
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

    return (
        <div>
            <div className="mb-2 d-flex justify-content-between align-items-center custom-board-detail-title">
                <div className="ms-1" style={{fontSize: '18px'}}>{board.title}</div>
                <div style={{color: 'rgb(128,128,128)'}}>{board.createdAt}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center ms-1">
                <div>
                    <span className="ms-3 me-3" style={{color: 'rgb(128,128,128)'}}>{board.user?.username}</span>
                </div>
                <div className="me-2">
                    <span className="me-1" style={{color: 'rgb(128,128,128)'}}>조회수: {board.views}</span>
                </div>
            </div>
            <hr/>
            {isAuthenticated && userId === board.user?.userId && board.editable && (
                <div className="d-flex justify-content-end mb-2">
                    <Link to={`/board/updateForm/${board.boardId}`} className="btn btn-secondary btn-sm me-1">
                        수정
                    </Link>
                    <button className="btn btn-secondary btn-sm" onClick={boardDelete}>
                        삭제
                    </button>
                </div>
            )}
            <div className="ms-2 py-3">{board.content}</div>
            <hr/>
        </div>
    );
};

export default BoardDetailItem;
