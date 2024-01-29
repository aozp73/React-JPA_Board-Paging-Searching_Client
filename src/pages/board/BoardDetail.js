import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {store} from "../../auth/store";
import api from "../../auth/authInterceptor";
import apiOptional from "../../auth/authOptionalInterceptor";
import BoardDetailItem from "../../components/board/boarddetail/BoardDetailItem";
import CommentItem from "../../components/board/boarddetail/CommentItem";
import CommentForm from "../../components/board/boarddetail/CommentForm";

const BoardDetail = () => {
    const {boardId} = useParams();
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated, userId } = auth;

    const [board, setBoard] = useState({});
    const [comments, setComments] = useState([]);
    const [postComment, setPostComment] = useState({boardId: boardId, content: ''});
    const [updateComment, setUpdateComment] = useState({boardId: boardId, commentId:null, content:''});


    useEffect(() => {
        fetchBoardDetail(boardId);
    }, [boardId]);

    const fetchBoardDetail = async (id) => {

        apiOptional.get(`/board/${id}`)
            .then( res => {
                console.log("게시글 상세 조회 성공", res);

                setBoard(res.data.data.boardDetailDTO);
                setComments(res.data.data.commentListDTOS);

            }).catch(error => {
                console.error('게시글 상세 조회 실패', error);

                alert("일시적인 서버 에러가 발생했습니다.");
         });
    };


    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="custom-board-detail-container mb-5 mt-5">
                {/* 게시글 */}
                <BoardDetailItem
                    board={board}
                    boardId={boardId}
                    isAuthenticated={isAuthenticated}
                    userId={userId}
                />

                {/* 댓글 내용 */}
                <CommentItem
                    comments={comments}
                    setComments={setComments}
                    updateComment={updateComment}
                    setUpdateComment={setUpdateComment}
                    isAuthenticated={isAuthenticated}
                    userId={userId}
                    boardId={boardId}
                />

                {/* 댓글 작성 */}
                <CommentForm
                    comments={comments}
                    setComments={setComments}
                    postComment={postComment}
                    setPostComment={setPostComment}
                    isAuthenticated={isAuthenticated}
                />
            </div>
        </div>
    );
};

export default BoardDetail;
