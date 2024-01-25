import React, { useEffect, useState } from 'react';

/**
 * 부모 컴포넌트
 * - pages/user/JoinForm.js
 * 기능
 * - 유효성 체크 (최대 6글자)
 * -> 입력 값 확인 후, 부모 컴포넌트 내 validCheck 상태 관리
 */
const UsernameInput = ({ user, setUser, setValidCheck, validCheck }) => {
    const [userNameCheckMessage, setUserNameCheckMessage] = useState('');
    const validRegexs = {
        username: /^.{0,6}$/ // 최대 6글자
    };

    useEffect(() => {
        checkUsername();
    }, [user.username]);

    const checkUsername = () => {
        if (user.username === '') {
            setUserNameCheckMessage('');
            setValidCheck({
                ...validCheck,
                username: false,
            });
            return;
        }

        if (!validRegexs.username.test(user.username)) {
            setUserNameCheckMessage('6글자 이하로 작성해주세요.');
            setValidCheck({
                ...validCheck,
                username: false,
            });
            return;
        }

        setUserNameCheckMessage('');
        setValidCheck({
            ...validCheck,
            username: true,
        });
    };

    const changeUsername = (e) => {
        setUser({ ...user, username: e.target.value });
    };

    return (
        <div className="mb-5">
            <input type="text" name="username" value={user.username} onChange={changeUsername}
                   className="form-control" placeholder="아이디" required />
            <div id="userNameError" className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>
                {userNameCheckMessage}
            </div>
        </div>
    );
};

export default UsernameInput;
