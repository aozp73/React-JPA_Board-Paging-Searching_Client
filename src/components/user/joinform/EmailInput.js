import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * 부모 컴포넌트
 * - pages/user/JoinForm.js
 * 기능
 * - 이메일 입력 & onChange: Server 통신 후, 중복 체크
 * -> 입력 값 확인 후, 부모 컴포넌트 내 validCheck 상태 관리
 */
const EmailInput = ({ user, setUser, setValidCheck, validCheck }) => {
    const [emailCheckMessage, setEmailCheckMessage] = useState('');

    useEffect(() => {
        checkEmail();
    }, [user.email]);

    const checkEmail = async () => {
        const email = user.email;
        if (email === '') {
            setEmailCheckMessage('');
            setValidCheck({
                ...validCheck,
                email: false,
            });
            return;
        }

        axios.get(`http://localhost:8080/api/emailCheck?email=${email}`)
            .then((res) => {
                if (res.data.data) {
                    setEmailCheckMessage('사용 가능한 이메일입니다.');
                    setValidCheck({
                        ...validCheck,
                        email: true,
                    });
                } else {
                    setEmailCheckMessage('이미 사용 중인 이메일입니다.');
                    setValidCheck({
                        ...validCheck,
                        email: false,
                    });
                }})
            .catch(error => console.error('이메일 중복 확인에 실패했습니다.', error))
    };

    const changeEmail = (e) => {
        setUser({ ...user, email: e.target.value });
    };

    const emailCheckStyle = {
        color: emailCheckMessage === '사용 가능한 이메일입니다.' ? 'green' : 'orangered',
    };

    return (
        <div className="mb-3">
            <input type="email" name="email" value={user.email} onChange={changeEmail}
                   className="form-control" placeholder="이메일" required />
            <div id="emailError" className="mt-2 mb-3 ms-2" style={emailCheckStyle}>
                {emailCheckMessage}
            </div>
        </div>
    );
};

export default EmailInput;
