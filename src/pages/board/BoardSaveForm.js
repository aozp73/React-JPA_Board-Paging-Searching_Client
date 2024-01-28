import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import api from "../../auth/authInterceptor";

const BoardSaveForm = () => {
    const navigate = useNavigate();
    const { isAuthenticated}  = useSelector((state) => state.auth);
    const [board, setBoard] = useState({title: '', content: ''});

    const changeValue = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        api.post(`/board`, board)
            .then(res => {
                console.log("게시글 등록 성공", res);
                navigate(`/board/${res.data.data.boardDetailDTO.boardId}`)
            })
            .catch(error => {
                console.error('게시글 상세 조회 실패', error);
                alert("일시적인 서버 에러가 발생했습니다.");
            });

    };

    const handleCancel = () => {
        const isConfirmed = window.confirm('페이지를 벗어나면 작성 중인 내용이 저장되지 않습니다. ');

        if (isConfirmed) {
            navigate(-1);
        }
    };

    return (
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="custom-board-save-container mb-5 mt-5">
                <div className="text-center" style={{ marginBottom: '37px' }}>
                    <h2>게시글 등록</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <input
                            type="text" className="form-control" placeholder="제목을 입력하세요" required
                            onChange={changeValue} name="title"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            className="form-control" rows="13" placeholder="내용을 입력하세요" required
                            onChange={changeValue} name="content"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-secondary me-2">등록</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BoardSaveForm;
