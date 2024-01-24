import React from 'react';
import {Link} from "react-router-dom";

const LoginForm = () => {
    return (
        <div style={{ marginTop: '70px', marginBottom: '100px' }}>
            <div className="custom-login-container mb-5 mt-5">
                <form action="/login" method="POST">
                    {/*<div className="alert alert-danger" style={{ display: 'none' }}>*/}
                    {/*    올바르지 않은 정보입니다.*/}
                    {/*</div>*/}
                    <div className="mb-3">
                        <input type="email" name="username"
                               className="form-control" placeholder="이메일" required />
                    </div>
                    <div className="mb-4">
                        <input type="password" name="password" className="form-control"
                               placeholder="비밀번호" required />
                    </div>
                    <div>
                        <div className="mb-2">
                            <button type="submit" className="btn btn-primary custom-login-btn">
                                로그인
                            </button>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="me-2">
                                <Link to="/joinForm" className="custom-login-link">회원가입</Link>
                            </div>
                            <div>
                                <a href="#" className="custom-login-link">비밀번호 찾기</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
