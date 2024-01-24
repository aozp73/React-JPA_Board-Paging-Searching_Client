import React, { useState } from 'react';

const JoinForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // 유효성 검사 및 상태 업데이트 함수들
    const checkEmail = (event) => {
        setEmail(event.target.value);
    };

    const validatePassword = (event) => {
    };


    return (
        <div style={{ marginTop: '70px', marginBottom: '70px' }}>
            <div className="custom-join-container mb-5 mt-5">
                <div className="text-center" style={{ marginBottom: '35px' }}>
                    <h2>회원가입</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-between">
                        <input type="email" value={email} onChange={checkEmail}
                               className="form-control" placeholder="이메일" required />
                        {/*<div className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>*/}
                        {/*</div>*/}
                    </div>
                    <div id="emailCheckMessage" className="mb-3 ms-2"></div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={validatePassword}
                               className="form-control" placeholder="비밀번호" required />
                        {/*<div id="passwordError" className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>*/}
                        {/*</div>*/}
                    </div>
                    <div>
                        <input type="password" value={passwordConfirmation} onChange={validatePassword}
                               className="form-control" placeholder="비밀번호 확인" required />
                        <div id="passwordConfirmationError" className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>
                        </div>
                    </div>
                    <div className="mb-5">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                               className="form-control" placeholder="아이디" required />
                        {/*<div className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>*/}
                        {/*</div>*/}
                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary custom-join-btn">
                            등록하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinForm;