import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {

    const isAuthenticated = false;

    return (
        <header>
            <nav className="custom-navbar-layout navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid ms-3">
                    <Link className="navbar-brand" to="/">Home</Link>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="d-flex justify-content-between w-100">
                            <ul className="navbar-nav ms-3">
                                <li className="nav-item">
                                    <a className="nav-link" href="/board">게시판</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav me-5">
                                {isAuthenticated ? (
                                    <li id="statusLogin" className="nav-item">
                                        <div className="d-flex">
                                            <span className="nav-link me-2">{/* 사용자 이름 */}</span>
                                            <a className="nav-link" href="/logout">로그아웃</a>
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