import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import api from "../../auth/authInterceptor";

const BoardUpdateForm = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, userId }  = useSelector((state) => state.auth);
    const [board, setBoard] = useState({id:'', title: '', content: ''});

    const changeValue = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (!isAuthenticated) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        fetchBoardUpdateForm(boardId);
    }, [boardId]);

    const fetchBoardUpdateForm = async (boardId) => {

        /**
         * DB 데이터로 렌더링 하는 이유
         * - detail 값을 쓸 경우,
         *   tab 2개 킨 상태에서 이전 값이 수정 페이지에 렌더링 되는 버그 발생
         */
        api.get(`/board/${boardId}`)
            .then(res => {
                console.log("게시글 수정 페이지 조회 성공", res);

                if (res.data.data.userId !== userId) {
                    alert("수정 권한이 없습니다.");
                    navigate(-1);
                    return;
                }
                setBoard({ id:boardId, title: res.data.data.title, content: res.data.data.content });
            })
            .catch(error => {
                console.error('게시글 상세 조회 실패', error);
                alert("일시적인 서버 에러가 발생했습니다.");
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/board`, board)
            .then( res => {
                console.log("게시글 수정 성공", res);
                navigate(`/board/${boardId}`)
            })
            .catch(error => {
                console.error('게시글 수정 실패', error);
                alert("일시적인 서버 에러가 발생했습니다.");
            });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="custom-board-save-container mb-5 mt-5">
                <div className="text-center" style={{ marginBottom: '37px' }}>
                    <h2>게시글 수정</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <input
                            type="text" className="form-control" placeholder="제목을 입력하세요" required
                            onChange={changeValue} name="title" value={board.title}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            className="form-control" rows="13" placeholder="내용을 입력하세요" required
                            onChange={changeValue} name="content" value={board.content}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-secondary me-2">수정</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BoardUpdateForm;