import React, { useEffect, useState } from 'react';

/**
 * 부모 컴포넌트
 * - pages/user/JoinForm.js
 * 기능
 * - 비밀번호, 비밀번호 확인 체크
 * - 유효성 체크 (6-12글자 + 숫자-영문자 포함)
 * -> 입력 값 확인 후, 부모 컴포넌트 내 validCheck 상태 관리
 */
const PasswordInput = ({ user, setUser, setValidCheck, validCheck }) => {
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('');

    const validRegexs = {
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/, // 6-12글자 + 숫자-영문자 모두 포함
    };

    useEffect(() => {
        checkPassword();
    }, [user.password, user.passwordConfirmation]);

    const checkPassword = () => {
        const passwordVal = user.password
        const passwordConfirmationVal = user.passwordConfirmation

        if (passwordVal === '' || passwordConfirmationVal === '') {
            setPasswordCheckMessage('');
            setValidCheck({
                ...validCheck,
                password: false,
            });
            return;
        }

        if (passwordVal !== passwordConfirmationVal) {
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
            setValidCheck({
                ...validCheck,
                password: false,
            });
            return;
        }

        if (!validRegexs.password.test(passwordVal)) {
            setPasswordCheckMessage('영어, 숫자를 조합해주세요. (6-12자)');
            setValidCheck({
                ...validCheck,
                password: false,
            });
            return;
        }

        setPasswordCheckMessage('비밀번호 일치');
        setValidCheck({
            ...validCheck,
            password: true,
        });
    };

    const changePassword = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const passwordCheckStyle = {
        color: passwordCheckMessage === '비밀번호 일치' ? 'green' : 'orangered',
    };

    return (
        <>
            <div className="mb-3">
                <input type="password" name="password" value={user.password} onChange={changePassword}
                       className="form-control" placeholder="비밀번호" required />
            </div>
            <div>
                <input type="password" name="passwordConfirmation" value={user.passwordConfirmation} onChange={changePassword}
                       className="form-control" placeholder="비밀번호 확인" required />
                <div id="passwordConfirmationError" className="mt-2 mb-3 ms-2" style={passwordCheckStyle}>
                    {passwordCheckMessage}
                </div>
            </div>
        </>
    );
};

export default PasswordInput;
