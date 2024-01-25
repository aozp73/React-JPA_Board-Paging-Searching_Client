import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const LoginForm = () => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const changeValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/login`, user)
            .then((res) => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div style={{ marginTop: '70px', marginBottom: '100px' }}>
            <div className="custom-login-container mb-5 mt-5">
                <form onSubmit={handleLogin}>
                    <div className="alert alert-danger" style={{ display: 'none' }}>
                        올바르지 않은 정보입니다.
                    </div>
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
