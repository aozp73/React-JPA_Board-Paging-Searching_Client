import React, { useState } from 'react';

const BoardSaveForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleCancel = () => {
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
                            type="text" className="form-control" placeholder="제목을 입력하세요" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    {/* 오류 메시지를 표시하는 부분은 필요에 따라 추가합니다 */}
                    <div className="form-group mb-3">
                        <textarea
                            className="form-control" rows="13" placeholder="내용을 입력하세요" value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
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
