import React from 'react';

const Footer = () => {
    return (
        <footer>
            <hr />
            <div className="d-flex justify-content-center mb-5">
                <a href="#" className="custom-footer-link me-4">회사 소개</a>
                <a href="#" className="custom-footer-link me-4">광고 안내</a>
                <a href="#" className="custom-footer-link me-4">이용 약관</a>
                <a href="#" className="custom-footer-link me-4">개인정보처리방침</a>
                <a href="#" className="custom-footer-link">청소년보호정책</a>
            </div>
        </footer>
    );
};

export default Footer;