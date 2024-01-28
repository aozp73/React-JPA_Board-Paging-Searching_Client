import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const changeValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/login`, user, { withCredentials: true })
            .then(res => {
                console.log('로그인 성공', res.data);
                const {accessToken, userId, email, username} = res.data.data;

                /**
                 * refreshToken
                 * - XSS, CSRF 공격 대비 Cookie에 저장 (httponly,sameSite)
                 *
                 * accessToken & userId, email, username
                 * - redux-persist로 로컬 스토리지 관리
                 */
                dispatch({
                    type: 'LOGIN',
                    payload: { accessToken, userId, email, username }
                });

                navigate('/board/list');
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        console.error('400 Error:', error.response.data);
                        setErrorMessage(error.response.data.data);
                        setShowError(true);
                    }
                } else {
                    console.error('Error:', error.message);
                    setErrorMessage("일시적인 서버 오류가 발생했습니다.");
                    setShowError(true);
                }
            });
    }

    return (
        <div style={{ marginTop: '70px', marginBottom: '100px' }}>
            <div className="custom-login-container mb-5 mt-5">
                <form onSubmit={handleLogin}>
                    {showError && (
                        <div className="alert alert-danger py-2">
                            {errorMessage}
                        </div>
                    )}
                    <div className="mb-3">
                        <input type="email" name="email" value={user.email} onChange={changeValue}
                               className="form-control" placeholder="이메일" required />
                    </div>
                    <div className="mb-4">
                        <input type="password" name="password" value={user.password} onChange={changeValue}
                               className="form-control" placeholder="비밀번호" required />
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
                                {/* 부가 기능, 구현 x */}
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
