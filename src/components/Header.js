import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated, username } = auth;

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <header>
            <nav className="custom-navbar-layout navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid ms-3">
                    <Link className="navbar-brand" to="/">Home</Link>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="d-flex justify-content-between w-100">
                            <ul className="navbar-nav ms-3">
                                <li className="nav-item">
                                    <Link to="/board/list" className="nav-link">게시판</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav me-5">
                                {isAuthenticated ? (
                                    <li id="statusLogin" className="nav-item">
                                        <div className="d-flex">
                                            <span className="nav-link me-2">{username}</span>
                                            <span className="nav-link nav-link-logout" onClick={handleLogout}>로그아웃</span>
                                        </div>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <div>
                                            <Link className="nav-link" to="/loginForm">로그인</Link>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;